import locationController from "../Controllers/location.js";
import express from "express";

const router = express.Router();

/**
 * @swagger
 * /location/getAllLocations:
 *   get:
 *     tags:
 *       - Location
 *     summary: Get all locations
 *     description: Returns all locations
 *     responses:
 *       '200':
 *         description: Locations fetched successfully
 */
router.get('/getAllLocations', locationController.getAllLocations);

/**
 * @swagger
 * /location/getAllSites:
 *   get:
 *     tags:
 *       - Location
 *     summary: Get all sites
 *     description: Returns all sites
 *     responses:
 *       '200':
 *         description: Sites fetched successfully
 */
router.get('/getAllSites', locationController.getAllSites);

export default router;


