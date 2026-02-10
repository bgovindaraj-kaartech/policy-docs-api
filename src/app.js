const express = require('express');
const policyRoutes = require('./routes/policy.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();
app.use(express.json());

app.use('/api/policies', policyRoutes);
app.use(errorHandler);

module.exports = app;
