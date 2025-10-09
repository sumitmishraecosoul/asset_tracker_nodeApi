import All_Models from '../../Utils/All_Models.js';

const employeeController = {}

employeeController.getEmployeeById = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ message: 'Employee id is required in query.' });
        }
        const employee = await All_Models.Employee.findOne({ where: { id } });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee.', error: error.message });
    }
}

employeeController.getAllEmployees = async (req, res) => {
    try {
        const employees = await All_Models.Employee.findAll();
        res.status(200).json({ message: 'Employees fetched successfully.', data: employees });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees.', error: error.message });
    }
}

employeeController.createEmployee = async (req, res) => {
    try {
        const {name,email,phone,department} = req.body;
        if (!name || !email || !phone || !department) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const newEmployee = await All_Models.Employee.create({name,email,phone,department});
        res.status(201).json({message: 'Employee created successfully.'},newEmployee);
    } catch (error) {
        res.status(500).json({ message: 'Error creating employee.', error: error.message });
    }
}

employeeController.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ message: 'Employee id is required in query.' });
        }
        const deletedEmployee = await All_Models.Employee.destroy({ where: { id } });
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }
        res.status(200).json({message: 'Employee deleted successfully.'});
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee.', error: error.message });
    }
}


export default employeeController;
