// import { Request, Response, NextFunction } from 'express';
// import { asyncHandler } from '../utils/asyncHandler.ts';
// import jwt from 'jsonwebtoken';
// import { apiError } from '../utils/apiError.ts';
// import { User, IUser } from '../models/user.model.ts'; // make sure IUser is your user interface

// // Extend Request to include user property
// interface AuthRequest extends Request {
//     user?: IUser | null;
// }

// export const verifyJWT = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
//     try {
//         // Get token from cookies or Authorization header
//         const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
//         if (!token) {
//             throw new apiError(401, "Access Denied, No Token Provided");
//         }

//         // Verify token
//         const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRECT as string) as { id: string };

//         // Find user by ID
//         const user = await User.findById(decodedToken.id).select("-password");
//         if (!user) {
//             throw new apiError(401, "User not found");
//         }

//         // Attach user to request object
//         req.user = user;

//         next();
//     } catch (error: unknown) {
//         const message = (error as Error)?.message || "Invalid Access Token";
//         throw new apiError(401, message);
//     }
// });
