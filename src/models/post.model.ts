import mongoose, { Schema, Document } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

interface IPost extends Document {
    title: string;
    likes?: mongoose.Types.ObjectId[];
    images?: string[];
    video?: string[];
    user: mongoose.Types.ObjectId;
    comments?: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema: Schema<IPost> = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Like",
            },
        ],
        images: {
            type: [String],
            required: true,
            validate: {
                validator: function (arr: string[]) {
                    return arr.length > 0;
                },
                message: "At least one image is required",
            },
        },
        video: {
            type: [String],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            }
        ],
    },
    {
        timestamps: true
    }
);

PostSchema.plugin(mongooseAggregatePaginate);

export const Post = mongoose.model<IPost>("Post", PostSchema);