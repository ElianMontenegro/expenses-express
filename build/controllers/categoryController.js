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
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const category_1 = require("../models/category");
require("dotenv/config");
class CategoryController {
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            if (!(name)) {
                res.status(400).json({
                    msg: 'name empty'
                });
            }
            try {
                const category = new category_1.CategoryModel({
                    name
                });
                const data = yield category.save();
                if (!data) {
                    return res.status(500).json({
                        msg: 'error'
                    });
                }
                return res.status(201).json({
                    data
                });
            }
            catch (error) {
                return res.status(500).json({
                    msg: `error ${error}`
                });
            }
        });
    }
}
exports.categoryController = new CategoryController();
