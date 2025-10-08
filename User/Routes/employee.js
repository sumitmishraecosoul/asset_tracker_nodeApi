import employeeController from "../Controllers/employee.js";
import express from "express";

const router = express.Router();

/**
 * @swagger
 * /employee/getEmployeeById:
 *   get:
 *     tags:
 *       - Employee
 *     summary: Get employee by ID
 *     description: Returns a single employee based on the provided ID
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: The ID of the employee to get
 *         schema:
 *           type: string
 *           example: 1
 *     responses:
 *       '200':
 *         description: Employee fetched successfully
 */
router.get('/getEmployeeById', employeeController.getEmployeeById);

/**
 * @swagger
 * /employee/getAllEmployees:
 *   get:
 *     tags:
 *       - Employee
 *     summary: Get all employees
 *     description: Returns all employees
 *     responses:
 *       '200':
 *         description: Employees fetched successfully
 */
router.get('/getAllEmployees', employeeController.getAllEmployees);

/**
 * @swagger
 * /employee/createEmployee:
 *   post:
 *     tags:
 *       - Employee
 *     summary: Create a new employee
 *     description: Creates a new employee with the provided data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               phone:
 *                 type: string
 *                 example: 1234567890
 *               department:
 *                 type: string
 *                 example: IT
 *     responses:
 *       '201':
 *         description: Employee created successfully
 */
router.post('/createEmployee', employeeController.createEmployee);

/**
 * @swagger
 * /employee/deleteEmployee:
 *   delete:
 *     tags:
 *       - Employee
 *     summary: Delete an employee
 *     description: Deletes an employee based on the provided ID
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: The ID of the employee to delete
 *         schema:
 *           type: string
 *           example: 1
 *     responses:
 *       '200':
 *         description: Employee deleted successfully
 */
router.delete('/deleteEmployee', employeeController.deleteEmployee);

export default router;