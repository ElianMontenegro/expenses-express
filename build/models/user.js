"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
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
        minlength: 6,
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
    budget: {
        type: Number,
        default: 0
    }
}, {
    versionKey: false,
    timestamps: true,
}).pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        try {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(this.password, salt);
            this.password = hash;
            next();
        }
        catch (error) {
            console.log(error);
        }
    });
});
UserSchema.methods.comparePassword = function comparePassword(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(data, this.password);
    });
};
exports.UserModel = mongoose_1.model("user", UserSchema, "user", true);
