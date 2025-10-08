import employeeRoutes from '../User/Routes/employee.js';

const All_User_Routes = (app) => {
    app.use('/employee', employeeRoutes);
}

export default All_User_Routes;