import { asyncHandler } from "../utils/asyncHandler.ts";
import { Request, Response } from "express";
import { apiError } from "../utils/apiError.ts";
import { apiResponse } from "../utils/apiResponse.ts";
import { uploadOnCloudinary } from "../utils/cloudinary.ts";
import { User } from "../models/user.model.ts";
import { MulterRequest } from "../interfaces/multer.ts";
import { Types } from "mongoose";
import { verifyJWT } from "../middlewares/auth.middleware.ts";

const generateAcessAndRefreshToken = async (userId: Types.ObjectId | string) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new apiError(400, "User not found");
        }
        const accessToken = user?.generateAccessToken();
        const refreshToken = user?.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user?.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new apiError(500, "Failed to generate tokens");
    }
}

const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        throw new apiError(400, "Username or email already in use");
    }

    const localAvatarUrl = (req as MulterRequest).files?.avatarUrl?.[0]?.path;
    if (!localAvatarUrl) {
        throw new apiError(400, "Avatar file is required");
    }

    const uploadedAvatar = await uploadOnCloudinary(localAvatarUrl);
    const avatarUrl = uploadedAvatar.secure_url; // yeh sirf string hoti hai

    if (!avatarUrl) {
        throw new apiError(500, "Failed to upload avatar");
    }

    const newUser = await User.create({
        username,
        email,
        password,
        avatar: avatarUrl
    });
    const user = await User.findById(newUser._id).select("-password -refreshToken")

    if (!user) {
        throw new apiError(500, "Something Went Wrong While Fetching User");
    }
    return res
        .status(201)
        .json(
            new apiResponse(201, user, "User registered successfully")
        )
})

const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    if ((!email && !username) || !password) {
        throw new apiError(400, "Email and password are required");
    }

    const user = await User.findOne(
        email ? { email } : { username }
    ).select("+password");

    if (!user || !(await user.comparePassword(password))) {
        throw new apiError(401, "Invalid credentials");
    }
    const userId = user._id;
    const { accessToken, refreshToken } = await generateAcessAndRefreshToken(userId);
    const loginUser = await User.findById(userId).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(
            new apiResponse(200, { user: loginUser, accessToken, refreshToken }, "User logged in successfully")
        )
})

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user || !req.user._id) {
        throw new apiError(401, "Unauthorized");
    }
    const userId = req.user._id;

    await User.findByIdAndUpdate(
        userId,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const option = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", option)
        .clearCookie("refreshToken", option)
        .json(
            new apiResponse(201, {}, "User Logged Out")
        )
})

export {
    registerUser,
    loginUser,
    logoutUser
};