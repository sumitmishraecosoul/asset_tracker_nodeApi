import All_Models from './All_Models.js';

const All_Models_Relationship = () => {
    const {
        User,
        CategoryMaster,
        SubcategoryMaster,
        Employee,
        LocationMaster,
        Asset,
        ComputerAsset,
        ExternalAsset,
    } = All_Models;

    // ==============================================================
    // One-to-Many: Category -> Subcategory
    // --------------------------------------------------------------
    CategoryMaster.hasMany(SubcategoryMaster, {
        foreignKey: 'categoryId',
        as: 'subCategories',
    });
    SubcategoryMaster.belongsTo(CategoryMaster, {
        foreignKey: 'categoryId',
        as: 'category',
    });

    // ==============================================================
    // One-to-Many: Master Tables -> Assets
    // --------------------------------------------------------------
    // CategoryMaster (assetCategoryMaster) -> Assets
    CategoryMaster.hasMany(Asset, {
        foreignKey: 'categoryId',
        as: 'assets',
    });
    Asset.belongsTo(CategoryMaster, {
        foreignKey: 'categoryId',
        as: 'category',
    });

    // SubcategoryMaster (assetSubCategoryMaster) -> Assets
    SubcategoryMaster.hasMany(Asset, {
        foreignKey: 'subCategoryId',
        as: 'assets',
    });
    Asset.belongsTo(SubcategoryMaster, {
        foreignKey: 'subCategoryId',
        as: 'subCategory',
    });

    // LocationMaster -> Assets (location)
    LocationMaster.hasMany(Asset, {
        foreignKey: 'locationId',
        as: 'assetsAtLocation',
    });
    Asset.belongsTo(LocationMaster, {
        foreignKey: 'locationId',
        as: 'location',
    });

    // LocationMaster -> Assets (site)
    // Note: ERD shows a separate site reference; using a second FK to same master.
    LocationMaster.hasMany(Asset, {
        foreignKey: 'siteId',
        as: 'assetsAtSite',
    });
    Asset.belongsTo(LocationMaster, {
        foreignKey: 'siteId',
        as: 'site',
    });

    // ==============================================================
    // One-to-Many: Employee -> Assets (assignedTo)
    // --------------------------------------------------------------
    Employee.hasMany(Asset, {
        foreignKey: 'assignedToId',
        as: 'assets',
    });
    Asset.belongsTo(Employee, {
        foreignKey: 'assignedToId',
        as: 'assignedTo',
    });

    // ==============================================================
    // One-to-One: Assets -> Detailed Asset Tables
    // --------------------------------------------------------------
    // Computer specific details for an Asset
    Asset.hasOne(ComputerAsset, {
        foreignKey: 'assetId',
        as: 'computerDetails',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    ComputerAsset.belongsTo(Asset, {
        foreignKey: 'assetId',
        as: 'asset',
    });

    // External (non-computer) asset details for an Asset
    Asset.hasOne(ExternalAsset, {
        foreignKey: 'assetId',
        as: 'externalDetails',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    ExternalAsset.belongsTo(Asset, {
        foreignKey: 'assetId',
        as: 'asset',
    });

    // ==============================================================
    // Optional relationships: Users (not explicitly linked in ERD)
    // --------------------------------------------------------------
    // Add User <-> Asset relationships here if needed in the future.
}

export default All_Models_Relationship;

