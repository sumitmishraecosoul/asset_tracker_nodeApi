import All_Models from '../../Utils/All_Models.js';

const categoryController = {}

categoryController.getAllCategories = async (req, res) => {
    try {
        const categories = await All_Models.CategoryMaster.findAll({
            attributes: ['id', 'name', 'prefix']
        });
        res.status(200).json({ message: 'Categories fetched successfully.', data: categories });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories.', error: error.message });
    }
}

categoryController.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await All_Models.CategoryMaster.findByPk(id, {
            include: [{ model: All_Models.SubcategoryMaster, as: 'subCategories' }],
        });

        if (!category) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        res.status(200).json({ message: 'Category fetched successfully.', data: category });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category.', error: error.message });
    }
}

categoryController.getSubcategoriesForCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await All_Models.CategoryMaster.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        const subcategories = await All_Models.SubcategoryMaster.findAll({
            where: { categoryId: id },
        });

        res.status(200).json({ message: 'Subcategories fetched successfully.', data: subcategories });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subcategories.', error: error.message });
    }
}

export default categoryController;