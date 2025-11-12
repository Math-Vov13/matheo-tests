const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/courses');

const swaggerDefinition = require('../swaggerDef');
const app = express();
app.use(express.json());

const swaggerSpec = swaggerJSDoc({
  definition: swaggerDefinition,
  apis: [path.join(__dirname, 'controllers/*.js'), path.join(__dirname, 'routes/*.js')],
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const storage = require('./services/storage');

storage.seed();

app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

if (require.main === module) {
  const p = process.env.PORT || 3000;
  app.listen(p, () => {
    console.log(`Server listening on http://localhost:${p}`);
    console.log(`API docs available at http://localhost:${p}/api-docs`);
  });
}

module.exports = app;
