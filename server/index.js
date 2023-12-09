const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
require("dotenv").config();

const dbConnect = require("./config/dbConnect");
dbConnect();


app.use(cors());
app.use(express.json());



// Routes import
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/ProductRoutes");



app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
















const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
