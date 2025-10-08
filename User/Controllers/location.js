import All_Models from '../../Utils/All_Models.js';

const locationController = {}

locationController.getAllLocations = async (req, res) => {
    try {
        const locations = await All_Models.LocationMaster.findAll();
        res.status(200).json({message: 'Locations fetched successfully.'},locations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching locations.', error: error.message });
    }
}

locationController.getAllSites = async (req, res) => {
    try {
        const sites = await All_Models.LocationMaster.findAll();
        res.status(200).json({message: 'Sites fetched successfully.'},sites);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sites.', error: error.message });
    }
}

export default locationController;
