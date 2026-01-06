const express = require('express');
const routerConfig = require('./router.config');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})

app.use("/api", routerConfig);
console.log('Express configuration loaded.');
module.exports = app;