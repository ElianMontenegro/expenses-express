import { model, Schema, ObjectId } from "mongoose";

export interface ICategory{
    _id : ObjectId;
    name: string;
}

const categorySchema = new Schema(
    {
        name: {
            type : String,
            required: true,
            unique: true
        },
    },
    {
        versionKey: false,
    },
);


export let CategorySchema = model<ICategory>("category", categorySchema, "category", true);
