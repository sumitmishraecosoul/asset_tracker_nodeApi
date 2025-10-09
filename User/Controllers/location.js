import All_Models from '../../Utils/All_Models.js';

const locationController = {}

locationController.getAllLocations = async (req, res) => {
    try {
        const locations = await All_Models.LocationMaster.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        res.status(200).json({ message: 'Locations fetched successfully.', data: locations });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching locations.', error: error.message });
    }
}

locationController.getAllSites = async (req, res) => {
    try {
        const sites = await All_Models.LocationMaster.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        res.status(200).json({ message: 'Sites fetched successfully.', data: sites });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sites.', error: error.message });
    }
}

export default locationController;
