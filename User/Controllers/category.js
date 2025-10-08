import All_Models from '../../Utils/All_Models.js';

const categoryController = {}

categoryController.getAllCategories = async (req, res) => {
    try {
        const categories = await All_Models.CategoryMaster.findAll();
        res.status(200).json({message: 'Categories fetched successfully.'},categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories.', error: error.message });
    }
}

export default categoryController;