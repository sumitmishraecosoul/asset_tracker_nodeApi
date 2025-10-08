import dotenv from 'dotenv';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/sequelize';

import sequelize from './Utils/dbConnection.js';
import All_Models from './Utils/All_Models.js';

dotenv.config();

AdminJS.registerAdapter({ Database, Resource });

export async function setupAdmin(app) {
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

  const resources = [
    { resource: User, options: { navigation: { name: 'Administration', icon: 'User' } } },
    { resource: Employee, options: { navigation: { name: 'Employees', icon: 'User' } } },
    { resource: CategoryMaster, options: { navigation: { name: 'Masters', icon: 'Settings' } } },
    { resource: SubcategoryMaster, options: { navigation: { name: 'Masters', icon: 'Settings' } } },
    { resource: LocationMaster, options: { navigation: { name: 'Masters', icon: 'Settings' } } },
    { resource: Asset, options: { navigation: { name: 'Assets', icon: 'Archive' } } },
    { resource: ComputerAsset, options: { navigation: { name: 'Assets', icon: 'Archive' } } },
    { resource: ExternalAsset, options: { navigation: { name: 'Assets', icon: 'Archive' } } },
  ];

  const admin = new AdminJS({
    resources,
    rootPath: '/admin',
    branding: {
      companyName: 'Asset Management Admin',
    },
  });

  const authenticate = async (email, password) => {
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) return null;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      return { email };
    }
    return null;
  };

  const router = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: 'adminjs-secret',
    },
    null,
    {
      resave: false,
      saveUninitialized: false,
      secret: process.env.ADMIN_COOKIE_SECRET || 'adminjs-secret',
    },
  );

  app.use(admin.options.rootPath, router);
  return { admin, sequelize };
}

export default setupAdmin;


