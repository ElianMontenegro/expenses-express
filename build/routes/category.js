"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routeCategory = express_1.Router();
const categoryController_1 = require("../controllers/categoryController");
const JWThelpers_1 = require("../helpers/JWThelpers");
routeCategory.post('/category', JWThelpers_1.JWThelpers.authorizationAccessToken, categoryController_1.categoryController.createCategory);
exports.default = module.exports = routeCategory;
