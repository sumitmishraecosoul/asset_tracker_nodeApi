import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();

export function setupSwagger(app) {
  const port = process.env.PORT || 3000;

  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Asset Management API',
        version: '1.0.0',
        description: 'API documentation using Swagger',
      },
      tags: [
        {
          name: 'Employee',
          description: 'Operations related to employees',
        },
      ],
      servers: [{ url: `http://localhost:${port}` }],
    },
    // Adjust these globs to match where your route files live
    apis: [
      './Utils/All_User_Routes.js',
      './User/Routes/*.js',
    ],
  };

  const swaggerSpec = swaggerJSDoc(swaggerOptions);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
}


