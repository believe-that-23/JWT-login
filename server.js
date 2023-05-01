const express = require('express');
const connectDb = require('./config/db');
require('dotenv').config();
const app = express();
const port = 5000;


connectDb();

app.listen(port, () => {
    console.log(`server started on: ${port}`);
})