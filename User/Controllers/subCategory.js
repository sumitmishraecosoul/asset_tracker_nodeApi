import All_Models from '../../Utils/All_Models.js';

const subCategoryController = {}

subCategoryController.getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await All_Models.SubcategoryMaster.findAll({
            include: [{ model: All_Models.CategoryMaster, as: 'category' }],
        });
        res.status(200).json({ message: 'Subcategories fetched successfully.', data: subcategories });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subcategories.', error: error.message });
    }
}

subCategoryController.getSubcategoriesByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const subcategories = await All_Models.SubcategoryMaster.findAll({ where: { categoryId } });
        res.status(200).json({ message: 'Subcategories fetched successfully.', data: subcategories });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subcategories by category.', error: error.message });
    }
}

subCategoryController.createSubcategory = async (req, res) => {
    try {
        const { name, code, categoryId } = req.body;
        if (!name || !code || !categoryId) {
            return res.status(400).json({ message: 'name, code and categoryId are required.' });
        }

        const category = await All_Models.CategoryMaster.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        const subcategory = await All_Models.SubcategoryMaster.create({ name, code, categoryId });
        res.status(201).json({ message: 'Subcategory created successfully.', data: subcategory });
    } catch (error) {
        res.status(500).json({ message: 'Error creating subcategory.', error: error.message });
    }
}

export default subCategoryController;
