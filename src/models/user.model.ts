import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    refreshToken?: string;
    fullname?: string;
    avatarUrl?: string;
    bio?: string;
    savedPosts?: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;


    generateAccessToken(): string;
    generateRefreshToken(): string;
    comparePassword(plainPassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String
        },
        avatarUrl: {
            type: String,
            default: '',
        },
        fullname: {
            type: String,
            maxlength: 50,
        },
        bio: {
            type: String,
            default: '',
            maxlength: 160,
        },
        savedPosts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        }],
    },
    {
        timestamps: true
    }
)

UserSchema.pre<IUser>('save', async function () {
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10);
})

UserSchema.methods.comparePassword = async function (plainPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, this.password);
}

UserSchema.methods.generateAccessToken = function (): string {
    return jwt.sign(
        {
            _id: this._id.toString(),
            username: this.username,
            email: this.email,
            fullname: this.fullname,
        },
            process.env.ACCESS_TOKEN_SECRET as string,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY as string | any,
        }
    ) 
}

UserSchema.methods.generateRefreshToken = function (): string {
    return jwt.sign(
        {
            _id: this._id.toString(),
            username: this.username,
            email: this.email,
            fullname: this.fullname,
        }
        , process.env.REFRESH_TOKEN_SECRET as string,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY as string | any,
        }
    )
} 

export const User = mongoose.model<IUser>('User', UserSchema);
export { IUser };