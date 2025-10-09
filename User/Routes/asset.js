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
 *     description: Creates a new asset with auto-generated assetTagId (prefix + code + unique pin)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *               - categoryId
 *               - subCategoryId
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Available, Assigned, Under Maintenance, Broken]
 *                 example: Available
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               subCategoryId:
 *                 type: integer
 *                 example: 2
 *               checkOut:
 *                 type: boolean
 *                 example: false
 *               assignedToId:
 *                 type: integer
 *                 example: null
 *               locationId:
 *                 type: integer
 *                 example: 1
 *               siteId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       '201':
 *         description: Asset created successfully with auto-generated assetTagId
 *       '400':
 *         description: Missing required fields or invalid data
 *       '404':
 *         description: Category or Subcategory not found
 *       '500':
 *         description: Error creating asset or unable to generate unique assetTagId
 */
router.post('/createAssets', assetController.createAssets);

/**
 * @swagger
 * /asset/checkOut:
 *   post:
 *     tags:
 *       - Asset
 *     summary: Check-in/Check-out an asset
 *     description: Toggles checkOut and updates status (true → Assigned, false → Available). When assigning (checkOut=true), provide employeeId to set assignedTo.
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
 *               employeeId:
 *                 type: integer
 *                 description: Required when checkOut is true; assigns asset to this employee id
 *                 example: 42
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


