const express = require('express');
const routerConfig = require('./router.config');
const app = express();

app.use("/api", routerConfig);

module.exports = app;