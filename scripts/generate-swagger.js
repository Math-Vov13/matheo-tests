const fs = require('fs');
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = require('../swaggerDef');

const outputPath = path.join(__dirname, '..', 'swagger.json');

const swaggerSpec = swaggerJSDoc({
  definition: swaggerDefinition,
  apis: [
    path.join(__dirname, '..', 'src', 'controllers', '*.js'),
    path.join(__dirname, '..', 'src', 'routes', '*.js'),
  ],
});

fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));
console.log(`Swagger spec generated at ${outputPath}`);
