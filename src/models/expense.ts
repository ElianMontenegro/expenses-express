import { Double, ObjectId } from "mongodb";
import { model, Schema } from "mongoose";

export interface IExpenses {
    _id : ObjectId;
    title: string;
    amonut: Double;
    category: ObjectId;
    user: ObjectId;
}

const ExpenseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            default : 0
        },
        category: { type: Schema.Types.ObjectId, ref: "category" },
        user: { type: Schema.Types.ObjectId, ref: "user" },   
    },
    {
      versionKey: false,
      timestamps: true,
    }
);

export let ExpenseModel = model<IExpenses>("expense", ExpenseSchema, "expense", true);
