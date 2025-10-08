import categoryController from "../Controllers/category.js";
import express from "express";

const router = express.Router();

/**
 * @swagger
 * /category/getAllCategories:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get all categories
 *     description: Returns all categories
 *     responses:
 *       '200':
 *         description: Categories fetched successfully
 */
router.get('/getAllCategories', categoryController.getAllCategories);

export default router;


