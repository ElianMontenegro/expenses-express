import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUserDocument } from "../interface/IUserInterface";

export interface IUserModel extends IUserDocument {
  isModified(password: string): boolean;
  comparePassword: (password: string) => boolean;
}

const UserSchema = new Schema<IUserModel>(
  {
    username: {
      type: String,
      required: true,
      min: 6,
      max: 25,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      min: 10,
      max: 320,
      trim: true,
      required: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      minlength: 6,
      required: true
    },
    phone: {
      type: Number,
      minlength: 10,
      unique: true,
      default: 0,
    },
    tokenVersion: {
      type: Number,
      default: 0
    },
    budget : {
      type: Number,
      default: 0
    },
    facebookId: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
).pre<IUserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    console.log(error);
  }
});
UserSchema.methods.comparePassword = async function comparePassword(data) {
  return await bcrypt.compare(data, this.password);
};

export let UserModel = model<IUserModel>("user", UserSchema, "user", true);
