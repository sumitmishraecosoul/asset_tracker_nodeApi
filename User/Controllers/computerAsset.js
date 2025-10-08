import All_Models from '../../Utils/All_Models.js';

const computerAssetController = {}

computerAssetController.getAllComputerAssets = async (req, res) => {
    try {
        const records = await All_Models.ComputerAsset.findAll({
            include: [{ model: All_Models.Asset, as: 'asset' }]
        });
        res.status(200).json({ message: 'Computer assets fetched successfully.', data: records });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching computer assets.', error: error.message });
    }
}

computerAssetController.getComputerAssetById = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ message: 'id is required in query.' });
        }
        const record = await All_Models.ComputerAsset.findOne({
            where: { id },
            include: [{ model: All_Models.Asset, as: 'asset' }]
        });
        if (!record) {
            return res.status(404).json({ message: 'Computer asset not found.' });
        }
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching computer asset.', error: error.message });
    }
}

computerAssetController.createComputerAsset = async (req, res) => {
    try {
        const {
            assetId,
            brand,
            model,
            serialNumber,
            processor,
            ram1,
            ram2,
            totalRam,
            warrantyStart,
            warrantyEnd,
        } = req.body;

        if (!assetId || !brand || !model || !serialNumber || !processor || !ram1 || !ram2 || !totalRam || !warrantyStart || !warrantyEnd) {
            return res.status(400).json({ message: 'All required fields must be provided.' });
        }

        const record = await All_Models.ComputerAsset.create({
            assetId,
            brand,
            model,
            serialNumber,
            processor,
            ram1,
            ram2,
            totalRam,
            warrantyStart,
            warrantyEnd,
        });
        res.status(201).json({ message: 'Computer asset created successfully.', data: record });
    } catch (error) {
        res.status(500).json({ message: 'Error creating computer asset.', error: error.message });
    }
}

computerAssetController.updateComputerAsset = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ message: 'id is required in query.' });
        }

        const payload = { ...req.body };
        // Do not allow changing the owning Asset reference via update
        if (payload.assetId !== undefined) {
            delete payload.assetId;
        }
        const [affected] = await All_Models.ComputerAsset.update(payload, { where: { id } });
        if (!affected) {
            return res.status(404).json({ message: 'Computer asset not found.' });
        }
        const updated = await All_Models.ComputerAsset.findByPk(id);
        res.status(200).json({ message: 'Computer asset updated successfully.', data: updated });
    } catch (error) {
        res.status(500).json({ message: 'Error updating computer asset.', error: error.message });
    }
}

computerAssetController.deleteComputerAsset = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ message: 'id is required in query.' });
        }
        const deleted = await All_Models.ComputerAsset.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ message: 'Computer asset not found.' });
        }
        res.status(200).json({ message: 'Computer asset deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting computer asset.', error: error.message });
    }
}

export default computerAssetController;


