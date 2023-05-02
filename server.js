const express = require('express');
const connectDb = require('./config/db');
const authRoute = require('./routes/authRoute')
require('dotenv').config();
const app = express();
const port = 5000;


connectDb();

app.use(express.json());
app.use('/auth', authRoute);

app.listen(port, () => {
    console.log(`server started on: ${port}`);
})