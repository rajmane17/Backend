import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import jwt from 'jsonwebtoken'


async function generateAcessAndRefreshTokens (userId) {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        // we have added the refresh token but we need to save it also, so that our changes will be visible in db
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken};

    } catch (error) {
        throw new ApiError(500, "something went wrong while generating tokens")
        
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // get the details from the frontend
    // validate the data => all fields are present, email is validated, etc.
    // check if user already exists => email and username
    // check for coverImage and avatar
    // upload them to cloudinary
    // check wheather it is successfully added to cloudinary or not
    // create a user object ==> It created so that we can send data to mongodb
    // remove password and refresh token from the object, before sending it to user as a response
    // check for user creation
    // If user is created successfully return response

    const {email, username, password, fullname } = req.body;

/*
    // If you don't want to use the below code for validation then use this... do checking for every field in this way
    if( fullname === "" ){
        throw new ApiError({
            statusCode: 400,
            message: "Please enter your full name"
        })
    }

*/

    // A bit advance way for checking if any field is empty
    if ( [fullname, username, password, email].some(
        (field) => field?.trim() === ""
    )) {
        throw new ApiError(400,"Please enter all fields");
    }

    const existingUser = User.findOne({
        // because of or operator we can now check with both email and username
        $or: [{username}, {email}]  
    })

    if(existingUser) {
        throw new ApiError( 409,"User already exists." )
    }

    // By doing this hume pura path milta hai jo multer ne diya hai
    const avatarlocalfilepath = req.files?.avatar[0]?.path;
    const coverImglocalfilepath = req.files?.coverImage[0]?.path;

    if( !avatarlocalfilepath ){
        throw new ApiError( 400, "Please enter avatar image.")
    }

    // upload them to cloudinary
    const avatar = await uploadOnCloudinary(avatarlocalfilepath);
    const coverImage = await uploadOnCloudinary(coverImglocalfilepath);

    if( !avatar ) {
        throw new ApiError( 400, "Please upload avatar." )
    }

    console.log(avatar);
    const avatarUrlCloudinary = avatar.url;


    const newUser = await User.create({
        fullname,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatarUrlCloudinary,
        // These are some edge cases
        coverImage: coverImage?.url || ""
    });

    // To get a full proof idea that user is created.
    // we have select method through which we can remove the password and refreshtoken field
    const createdUser = await User.findById( newUser._id ).select("-password -refreshToken");

    if( !createdUser ) {
        throw new ApiError(500, "some went wrong while registering the user")
    }
    
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})

const userLogin = asyncHandler( async (req, res) => {
    // Get the data from the frontend
    // verify all the fields ==> any empty field, all fields are filled, etc
    // check if the user exists or not  ==> if no then give a error
    // check the password, if it is correct or not ?
    // if correct ==> generate tokens, else ==> give error
    // generate access and refresh token for the user
    // send the both the tokens to the user and store the refresh token in our db
    // send a response to user ==> Login successfull

    const {email, username, password} = req.body;

    // Have a look at the syntax over here
    if( !(email || username) ) throw new ApiError(400, "username or email is required")
    if( !password ) throw new ApiError(400, "Please enter your password")

    const user = await User.findOne({
        $or:[{username},{email}]
    })

    if(!user) {
        throw new ApiError(404, "User not found")
    }

    const isPasswordCorrect = await user.checkPassword(password);

    if( !isPasswordCorrect ) {
        throw new ApiError(401, "Incorrect Password")
    }

    const {accessToken, refreshToken} = await generateAcessAndRefreshTokens(user._id);

    // we are making a query again to db because at first query refreshToken field is empty.
    // Its totally up to us that we can query again or update the old query...
   const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

   // we need to design some options before sending the cookies
   const options = {
    // by default our cookies can be modified by anyone, but enabling these option restricts that.
    httpOlnly: true,
    secure: true,
   }

   return res
   .status(200)
   .cookie("accessToken", accessToken, options)
   .cookie("refreshToken", refreshToken, options)
   .json(
    new ApiResponse(200, {
        /* we are sending the accessToken and refreshToken because we are taking a case
        in which the user wants to store the cookies in his local storage or somewhere else. */
        user: loggedInUser, accessToken, refreshToken
    },
    "user logged in successfully"
)
   )

})

const handleLogOut = asyncHandler(async (req, res) => {
    
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined,
            }
        },
        {
            new: true
        }
    )

    const options = {
        // by default our cookies can be modified by anyone, but enabling these option restricts that.
        httpOlnly: true,
        secure: true,
    }

    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(
        new ApiResponse(200, {}, "User Logged out successfully")
    )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if( !incomingRefreshToken ){
        throw new ApiError(401, "Unauthorized token");
    }

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    console.log(payload);
    

    const user = await User.findById(decodedToken?._id).select("-password ");

    if(!user){
        throw new ApiError(401, "Invalid refresh token");
    }

    jwt.sign(user, process.env.TOKEN_SECRET)

})

export {registerUser, userLogin, handleLogOut, refreshAccessToken}