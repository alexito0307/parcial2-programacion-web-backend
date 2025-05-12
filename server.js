const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const app = express();
const colors = require('colors');
const { errorHandler } = require("./middleware/errorMiddleWare")

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/sales', require("./routes/salesRoutes"));
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));