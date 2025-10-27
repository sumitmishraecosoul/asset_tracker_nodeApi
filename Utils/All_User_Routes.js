import employeeRoutes from '../User/Routes/employee.js';
import categoryRoutes from '../User/Routes/category.js';
import subCategoryRoutes from '../User/Routes/subCategory.js';
import locationRoutes from '../User/Routes/location.js';
import assetRoutes from '../User/Routes/asset.js';
import computerAssetRoutes from '../User/Routes/computerAsset.js';
import externalAssetRoutes from '../User/Routes/externalAsset.js';

const All_User_Routes = (app) => {
    app.use('/employee', employeeRoutes);
    app.use('/category', categoryRoutes);
    app.use('/subCategory', subCategoryRoutes);
    app.use('/location', locationRoutes);
    app.use('/asset', assetRoutes);
    app.use('/computerAsset', computerAssetRoutes);
    app.use('/externalAsset', externalAssetRoutes);
}

export default All_User_Routes;