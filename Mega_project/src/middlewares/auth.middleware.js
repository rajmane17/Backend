// This middleware verifys if the user is present of not
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import User from "../models/user.models.js"

export const verifyJWT = asyncHandler(
    async (req, res, next) => {
    try {
        const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
            
        if(!accessToken){
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(accessToken, process.env.TOKEN_SECRET);
    
        if( !decodedToken ) throw new ApiError(401, "Unauthorized Token");
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})