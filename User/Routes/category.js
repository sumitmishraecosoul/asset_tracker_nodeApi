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
 *     description: Returns all categories with their subcategories
 *     responses:
 *       '200':
 *         description: Categories fetched successfully
 */
router.get('/getAllCategories', categoryController.getAllCategories);

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get a category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Category fetched successfully
 *       '404':
 *         description: Category not found
 */
router.get('/:id', categoryController.getCategoryById);

/**
 * @swagger
 * /category/{id}/subcategories:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get subcategories for a category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Subcategories fetched successfully
 *       '404':
 *         description: Category not found
 */
router.get('/:id/subcategories', categoryController.getSubcategoriesForCategory);

export default router;


