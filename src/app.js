const express = require('express');

require('dotenv').config();
const configs = require('./configs/config');
const router = require('./router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(configs.PORT, () => {
  console.log(`PORT: ${configs.PORT}`);
});
