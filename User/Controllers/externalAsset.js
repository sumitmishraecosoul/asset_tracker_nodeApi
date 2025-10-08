import All_Models from '../../Utils/All_Models.js';

const externalAssetController = {}

externalAssetController.getAllExternalAssets = async (req, res) => {
    try {
        const records = await All_Models.ExternalAsset.findAll({
            include: [{ model: All_Models.Asset, as: 'asset' }]
        });
        res.status(200).json({ message: 'External assets fetched successfully.', data: records });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching external assets.', error: error.message });
    }
}

externalAssetController.getExternalAssetById = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ message: 'id is required in query.' });
        }
        const record = await All_Models.ExternalAsset.findOne({
            where: { id },
            include: [{ model: All_Models.Asset, as: 'asset' }]
        });
        if (!record) {
            return res.status(404).json({ message: 'External asset not found.' });
        }
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching external asset.', error: error.message });
    }
}

externalAssetController.createExternalAsset = async (req, res) => {
    try {
        const {
            assetId,
            brand,
            model,
            serialNumber,
            warrantyStart,
            warrantyEnd,
        } = req.body;

        if (!assetId || !brand || !model || !serialNumber || !warrantyStart || !warrantyEnd) {
            return res.status(400).json({ message: 'All required fields must be provided.' });
        }

        const record = await All_Models.ExternalAsset.create({
            assetId,
            brand,
            model,
            serialNumber,
            warrantyStart,
            warrantyEnd,
        });
        res.status(201).json({ message: 'External asset created successfully.', data: record });
    } catch (error) {
        res.status(500).json({ message: 'Error creating external asset.', error: error.message });
    }
}

externalAssetController.updateExternalAsset = async (req, res) => {
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
        const [affected] = await All_Models.ExternalAsset.update(payload, { where: { id } });
        if (!affected) {
            return res.status(404).json({ message: 'External asset not found.' });
        }
        const updated = await All_Models.ExternalAsset.findByPk(id);
        res.status(200).json({ message: 'External asset updated successfully.', data: updated });
    } catch (error) {
        res.status(500).json({ message: 'Error updating external asset.', error: error.message });
    }
}

externalAssetController.deleteExternalAsset = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ message: 'id is required in query.' });
        }
        const deleted = await All_Models.ExternalAsset.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ message: 'External asset not found.' });
        }
        res.status(200).json({ message: 'External asset deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting external asset.', error: error.message });
    }
}

export default externalAssetController;


