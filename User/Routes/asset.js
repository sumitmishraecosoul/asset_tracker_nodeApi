import assetController from "../Controllers/asset.js";
import express from "express";

const router = express.Router();

/**
 * @swagger
 * /asset/getAllAssets:
 *   get:
 *     tags:
 *       - Asset
 *     summary: Get all assets
 *     description: Returns all assets with related details
 *     responses:
 *       '200':
 *         description: Assets fetched successfully
 */
router.get('/getAllAssets', assetController.getAllAssets);

/**
 * @swagger
 * /asset/getAssetsById:
 *   get:
 *     tags:
 *       - Asset
 *     summary: Get asset by ID
 *     description: Returns a single asset by ID
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: The ID of the asset to get
 *         schema:
 *           type: string
 *           example: 1
 *     responses:
 *       '200':
 *         description: Asset fetched successfully
 */
router.get('/getAssetsById', assetController.getAssetsById);

/**
 * @swagger
 * /asset/createAssets:
 *   post:
 *     tags:
 *       - Asset
 *     summary: Create a new asset
 *     description: Creates a new asset and its corresponding details based on category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               assetTagId:
 *                 type: string
 *               status:
 *                 type: string
 *                 example: Available
 *               checkOut:
 *                 type: boolean
 *               categoryId:
 *                 type: integer
 *               subCategoryId:
 *                 type: integer
 *               assignedToId:
 *                 type: integer
 *               locationId:
 *                 type: integer
 *               siteId:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Asset created successfully
 */
router.post('/createAssets', assetController.createAssets);

/**
 * @swagger
 * /asset/checkOut:
 *   post:
 *     tags:
 *       - Asset
 *     summary: Check-in/Check-out an asset
 *     description: Toggles checkOut and updates status (true → Assigned, false → Available)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               assetId:
 *                 type: integer
 *                 example: 1
 *               checkOut:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       '200':
 *         description: Asset checkOut updated successfully
 */
router.post('/checkOut', assetController.checkOutAsset);


/**
 * @swagger
 * /asset/deleteAssets:
 *   delete:
 *     tags:
 *       - Asset
 *     summary: Delete an asset
 *     description: Deletes an asset by ID
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: The ID of the asset to delete
 *         schema:
 *           type: string
 *           example: 1
 *     responses:
 *       '200':
 *         description: Asset deleted successfully
 */
router.delete('/deleteAssets', assetController.deleteAssets);

export default router;


