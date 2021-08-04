"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseModel = void 0;
const mongoose_1 = require("mongoose");
const ExpenseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        default: 0
    },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: "category" },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "user" },
}, {
    versionKey: false,
    timestamps: true,
});
exports.ExpenseModel = mongoose_1.model("expense", ExpenseSchema, "expense", true);
