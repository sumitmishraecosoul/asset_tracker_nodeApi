import All_Models from '../../Utils/All_Models.js';

const subCategoryController = {}

subCategoryController.getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await All_Models.SubcategoryMaster.findAll();
        res.status(200).json({message: 'Subcategories fetched successfully.'},subcategories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subcategories.', error: error.message });
    }
}

export default subCategoryController;
