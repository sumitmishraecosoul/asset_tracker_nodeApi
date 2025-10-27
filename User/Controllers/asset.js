import All_Models from '../../Utils/All_Models.js';
import generateFiveDigitPin from '../../Utils/assetNumberGenerator.js';

const assetController = {}

assetController.getAllAssets = async (req, res) => {
    try {
        const assets = await All_Models.Asset.findAll({
            attributes: ['id','status', 'assetTagId'],
            include: [
                { model: All_Models.CategoryMaster, as: 'category', attributes: ['name'] },
                { model: All_Models.SubcategoryMaster, as: 'subCategory', attributes: ['name'] },
                { model: All_Models.Employee, as: 'assignedTo', attributes: ['name'] },
                { model: All_Models.LocationMaster, as: 'location', attributes: ['location'] },
                { model: All_Models.LocationMaster, as: 'site', attributes: ['site'] },
                { model: All_Models.ComputerAsset, as: 'computerDetails', attributes: ['model'], required: false },
                { model: All_Models.ExternalAsset, as: 'externalDetails', attributes: ['model'], required: false },
            ]
        });

        const shaped = assets.map((a) => ({
            id: a.id,
            status: a.status,
            assetTagId: a.assetTagId,
            model: a.computerDetails ? a.computerDetails.model : (a.externalDetails ? a.externalDetails.model : null),
            category: a.category ? a.category.name : null,
            subCategory: a.subCategory ? a.subCategory.name : null,
            location: a.location ? a.location.location : null,
            site: a.site ? a.site.site : null,
            assignedTo: a.assignedTo ? a.assignedTo.name : null,
        }));

        res.status(200).json({ message: 'Assets fetched successfully.', data: shaped });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching assets.', error: error.message });
    }
}

assetController.getAssetsById = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ message: 'Asset id is required in query.' });
        }
        const asset = await All_Models.Asset.findOne({
            where: { id },
            attributes: ['assetTagId', 'checkOut', 'status', 'categoryId', 'subCategoryId', 'locationId', 'siteId', 'assignedToId'],
            include: [
                { model: All_Models.CategoryMaster, as: 'category', attributes: ['id', 'name', 'prefix'] },
                { model: All_Models.SubcategoryMaster, as: 'subCategory', attributes: ['id', 'name', 'code', 'categoryId'] },
                { model: All_Models.Employee, as: 'assignedTo', attributes: ['id', 'name'] },
                { model: All_Models.LocationMaster, as: 'location', attributes: ['location'] },
                { model: All_Models.LocationMaster, as: 'site', attributes: ['site'] },
                { model: All_Models.ComputerAsset, as: 'computerDetails', attributes: ['id', 'brand', 'model', 'serialNumber', 'processor', 'ram1', 'ram2', 'totalRam', 'warrantyStart', 'warrantyEnd'], required: false },
                { model: All_Models.ExternalAsset, as: 'externalDetails', attributes: ['id', 'brand', 'model', 'serialNumber', 'warrantyStart', 'warrantyEnd'], required: false },
            ]
        });
        if (!asset) {
            return res.status(404).json({ message: 'Asset not found.' });
        }
        const response = {
            assetTagId: asset.assetTagId,
            checkOut: asset.checkOut,
            status: asset.status,
            categoryId: asset.categoryId,
            subCategoryId: asset.subCategoryId,
            // For UI needs: use locationId to fetch both location and site via associations
            locationId: asset.locationId ?? null,
            assignedToId: asset.assignedToId,
            category: asset.category ? {
                id: asset.category.id,
                name: asset.category.name,
                prefix: asset.category.prefix,
            } : null,
            subCategory: asset.subCategory ? {
                id: asset.subCategory.id,
                name: asset.subCategory.name,
                code: asset.subCategory.code,
                categoryId: asset.subCategory.categoryId,
            } : null,
            assignedTo: asset.assignedTo ? {
                id: asset.assignedTo.id,
                name: asset.assignedTo.name,
            } : null,
            // location and site strings resolved via associations
            location: asset.location ? asset.location.location : null,
            site: asset.site ? asset.site.site : null,
        };

        if (asset.computerDetails) {
            response.computerDetails = {
                id: asset.computerDetails.id,
                brand: asset.computerDetails.brand,
                model: asset.computerDetails.model,
                serialNumber: asset.computerDetails.serialNumber,
                processor: asset.computerDetails.processor,
                ram1: asset.computerDetails.ram1,
                ram2: asset.computerDetails.ram2,
                totalRam: asset.computerDetails.totalRam,
                warrantyStart: asset.computerDetails.warrantyStart,
                warrantyEnd: asset.computerDetails.warrantyEnd,
            };
        } else if (asset.externalDetails) {
            response.externalDetails = {
                id: asset.externalDetails.id,
                brand: asset.externalDetails.brand,
                model: asset.externalDetails.model,
                serialNumber: asset.externalDetails.serialNumber,
                warrantyStart: asset.externalDetails.warrantyStart,
                warrantyEnd: asset.externalDetails.warrantyEnd,
            };
        }

        res.status(200).json({ message: 'Asset fetched successfully.', data: response });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching asset.', error: error.message });
    }
}

assetController.createAssets = async (req, res) => {
    try {
        const { status, checkOut, categoryId, subCategoryId, assignedToId, locationId, siteId } = req.body;
        if (!status || !categoryId || !subCategoryId) {
            return res.status(400).json({ message: 'status, categoryId and subCategoryId are required.' });
        }

        // Fetch category and subcategory to get prefix and code
        const category = await All_Models.CategoryMaster.findByPk(categoryId);
        const subCategory = await All_Models.SubcategoryMaster.findByPk(subCategoryId);
        
        if (!category) {
            return res.status(404).json({ message: 'Category not found.' });
        }
        if (!subCategory) {
            return res.status(404).json({ message: 'Subcategory not found.' });
        }

        // Generate unique assetTagId
        let assetTagId;
        let isUnique = false;
        let attempts = 0;
        const maxAttempts = 100;

        while (!isUnique && attempts < maxAttempts) {
            const pin = generateFiveDigitPin();
            assetTagId = `${category.prefix}${subCategory.code}${pin}`;
            
            // Check if this assetTagId already exists
            const existingAsset = await All_Models.Asset.findOne({ where: { assetTagId } });
            if (!existingAsset) {
                isUnique = true;
            }
            attempts++;
        }

        if (!isUnique) {
            return res.status(500).json({ message: 'Unable to generate unique asset tag ID after multiple attempts.' });
        }

        const newAsset = await All_Models.Asset.create({
            assetTagId,
            status,
            checkOut: Boolean(checkOut),
            categoryId,
            subCategoryId,
            assignedToId,
            locationId,
            siteId,
        });
        res.status(201).json({ message: 'Asset created successfully.', data: newAsset });
    } catch (error) {
        res.status(500).json({ message: 'Error creating asset.', error: error.message });
    }
}

assetController.deleteAssets = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ message: 'Asset id is required in query.' });
        }
        const deleted = await All_Models.Asset.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ message: 'Asset not found.' });
        }
        res.status(200).json({ message: 'Asset deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting asset.', error: error.message });
    }
}


assetController.checkOutAsset = async (req, res) => {
    try {
        const { assetId, checkOut, employeeId } = req.body;
        if (assetId === undefined || checkOut === undefined) {
            return res.status(400).json({ message: 'assetId and checkOut are required.' });
        }

        const asset = await All_Models.Asset.findOne({ where: { id: assetId } });
        if (!asset) {
            return res.status(404).json({ message: 'Asset not found.' });
        }

        // When setting to Assigned, ensure a valid employeeId is provided and exists
        if (checkOut) {
            if (!employeeId) {
                return res.status(400).json({ message: 'employeeId is required when assigning an asset.' });
            }
            const employee = await All_Models.Employee.findByPk(employeeId);
            if (!employee) {
                return res.status(404).json({ message: 'Employee not found.' });
            }
        }

        const newStatus = checkOut ? 'Assigned' : 'Available';
        const newAssignedToId = checkOut ? employeeId : null;

        await asset.update({
            checkOut: Boolean(checkOut),
            status: newStatus,
            assignedToId: newAssignedToId,
        });

        return res.status(200).json({ message: 'Asset checkOut updated successfully.', data: asset });
    } catch (error) {
        res.status(500).json({ message: 'Error updating checkOut.', error: error.message });
    }
}

assetController.getAssetsByStatus = async (req, res) => {
    try {
        const assets = await All_Models.Asset.findAll({
            attributes: ['status']
        });

        const statusCounts = {
            "Available": 0,
            "Assigned": 0,
            "Under Maintenance": 0,
            "Broken": 0
        };

        assets.forEach(asset => {
            if (statusCounts[asset.status] !== undefined) {
                statusCounts[asset.status]++;
            }
        });

        res.status(200).json({ message: 'Asset status counts fetched successfully.', data: statusCounts });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching asset status counts.', error: error.message });
    }
}


assetController.getAssetsCountByCategory = async (req, res) => {
    try {
        const assets = await All_Models.Asset.findAll({
            attributes: ['categoryId'],
            include: [
                { model: All_Models.CategoryMaster, as: 'category', attributes: ['name'] }
            ]
        });

        const categoryCounts = {};

        assets.forEach(asset => {
            const categoryName = asset.category ? asset.category.name : 'Unknown';
            if (categoryCounts[categoryName]) {
                categoryCounts[categoryName]++;
            } else {
                categoryCounts[categoryName] = 1;
            }
        });

        res.status(200).json({ message: 'Asset counts by category fetched successfully.', data: categoryCounts });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching asset counts by category.', error: error.message });
    }
}

export default assetController;


