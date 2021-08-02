import { Request, Response } from "express";
import { CategoryModel } from "../models/category";
import "dotenv/config";

class CategoryController{
    public async createCategory(req: Request, res: Response){
        const { name } = req.body
        if(!(name)){
            res.status(400).json({
                msg:'name empty'
            })
        }
        try {
            const category = new CategoryModel({
                name
            })
            const data = await category.save()
            if(!data){
                return res.status(500).json({
                    msg: 'error'
                })
            }
            return res.status(201).json({
                data
            })
        } catch (error) {
            return res.status(500).json({
                msg: `error ${error}`
            })
        }
    }
}

export const categoryController = new CategoryController();