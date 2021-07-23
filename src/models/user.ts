import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUserDocument } from "../interface/IUserInterface";

const UserSchema = new Schema<IUserDocument>(
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
      required: true,
      min: 10,
      max: 320,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: Number,
      minlength: 10,
      unique: true,
      default: 0,
    },
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

export let UserModel = model("user", UserSchema, "users", true);
