const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
require("dotenv").config();
const dbConnect = require("./config/dbConnect");
dbConnect();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({extended:false}));

// Routes import
const userRoutes = require("./routes/userRoutes");



app.use("/api/user", userRoutes);


















const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));