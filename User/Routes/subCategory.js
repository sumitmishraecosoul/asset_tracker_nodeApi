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
 *     description: Returns all subcategories with their parent category
 *     responses:
 *       '200':
 *         description: Subcategories fetched successfully
 */
router.get('/getAllSubcategories', subCategoryController.getAllSubcategories);

/**
 * @swagger
 * /subCategory/by-category/{categoryId}:
 *   get:
 *     tags:
 *       - SubCategory
 *     summary: Get subcategories by category ID
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Subcategories fetched successfully
 */
router.get('/by-category/:categoryId', subCategoryController.getSubcategoriesByCategory);

/**
 * @swagger
 * /subCategory:
 *   post:
 *     tags:
 *       - SubCategory
 *     summary: Create a new subcategory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, code, categoryId]
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Subcategory created successfully
 */
router.post('/', subCategoryController.createSubcategory);

export default router;


