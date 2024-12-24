const { randomBytes, createHmac } = require("crypto");
const { Schema, model }  = require("mongoose");
const {generateToken} = require("../service/auth");

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    salt:{
        type: String,
    },
    role:{
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
}, {timestamps: true})

// This middleware is triggered before saving a document in the MongoDB database using Mongoose.
// This middleware is used to hash the password before saving it to the database.
userSchema.pre("save", function (next){
    const user = this;

    // If the password is not modified, so the control will be passed to next middleware
    if (!user.isModified("password")) return next();

    const salt = randomBytes(16).toString("hex");

    const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex")

    user.salt = salt;
    user.password = hashedPassword;

    next();
})

userSchema.static("validatePassNGenerateToken", async function (email, password){

    const user = await this.findOne({email});

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex")

    if(hashedPassword === userProvidedPassword){
        const token = generateToken(user);
        return token;
    }else{
        throw new Error("Incorrect Password");
    }
})

const USER = model("user", userSchema);

module.exports = USER;