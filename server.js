const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const app = express();
const colors = require('colors');

connectDB();

app.use(exppress.json());
app.use(express.urlencoded({extended: false}));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));