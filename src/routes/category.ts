import { Router } from "express";
const routeCategory : Router = Router();
import { categoryController } from '../controllers/categoryController';
import { JWThelpers } from '../helpers/JWThelpers';


routeCategory.post('/category', 
    JWThelpers.authorizationToken, 
    categoryController.createCategory
)

export default module.exports = routeCategory;
