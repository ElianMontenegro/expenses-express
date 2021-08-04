"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
}, {
    versionKey: false,
});
exports.CategoryModel = mongoose_1.model("category", categorySchema, "category", true);
