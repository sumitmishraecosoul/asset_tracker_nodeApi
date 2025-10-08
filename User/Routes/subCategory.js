import subCategoryController from "../Controllers/subCategory.js";
import express from "express";

const router = express.Router();

/**
 * @swagger
 * /subCategory/getAllSubcategories:
 *   get:
 *     tags:
 *       - SubCategory
 *     summary: Get all subcategories
 *     description: Returns all subcategories
 *     responses:
 *       '200':
 *         description: Subcategories fetched successfully
 */
router.get('/getAllSubcategories', subCategoryController.getAllSubcategories);

export default router;


