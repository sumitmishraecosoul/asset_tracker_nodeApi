import All_Models from '../../Utils/All_Models.js';

const assetController = {}

assetController.getAllAssets = async (req, res) => {
    try {
        const assets = await All_Models.Asset.findAll({
            include: [
                { model: All_Models.CategoryMaster, as: 'category' },
                { model: All_Models.SubcategoryMaster, as: 'subCategory' },
                { model: All_Models.Employee, as: 'assignedTo' },
                { model: All_Models.LocationMaster, as: 'location' },
                { model: All_Models.LocationMaster, as: 'site' },
                { model: All_Models.ComputerAsset, as: 'computerDetails' },
                { model: All_Models.ExternalAsset, as: 'externalDetails' },
            ]
        });
        res.status(200).json({ message: 'Assets fetched successfully.', data: assets });
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
            include: [
                { model: All_Models.CategoryMaster, as: 'category' },
                { model: All_Models.SubcategoryMaster, as: 'subCategory' },
                { model: All_Models.Employee, as: 'assignedTo' },
                { model: All_Models.LocationMaster, as: 'location' },
                { model: All_Models.LocationMaster, as: 'site' },
                { model: All_Models.ComputerAsset, as: 'computerDetails' },
                { model: All_Models.ExternalAsset, as: 'externalDetails' },
            ]
        });
        if (!asset) {
            return res.status(404).json({ message: 'Asset not found.' });
        }
        res.status(200).json(asset);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching asset.', error: error.message });
    }
}

assetController.createAssets = async (req, res) => {
    try {
        const { assetTagId, status, checkOut, categoryId, subCategoryId, assignedToId, locationId, siteId } = req.body;
        if (!assetTagId || !status) {
            return res.status(400).json({ message: 'assetTagId and status are required.' });
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
        const { assetId, checkOut } = req.body;
        if (assetId === undefined || checkOut === undefined) {
            return res.status(400).json({ message: 'assetId and checkOut are required.' });
        }

        const asset = await All_Models.Asset.findOne({ where: { id: assetId } });
        if (!asset) {
            return res.status(404).json({ message: 'Asset not found.' });
        }

        const newStatus = checkOut ? 'Assigned' : 'Available';
        await asset.update({ checkOut: Boolean(checkOut), status: newStatus });
        return res.status(200).json({ message: 'Asset checkOut updated successfully.', data: asset });
    } catch (error) {
        res.status(500).json({ message: 'Error updating checkOut.', error: error.message });
    }
}

export default assetController;


