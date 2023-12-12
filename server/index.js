const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
require("dotenv").config();
<<<<<<< HEAD
const { authMiddleware,errorHandler, } = require("./middlewares/authMiddleware");
=======

>>>>>>> 131a352 (bilal)
const dbConnect = require("./config/dbConnect");
dbConnect();


<<<<<<< HEAD



app.use(cors());
app.use(express.json());

=======
app.use(cors());
app.use(express.json());



>>>>>>> 131a352 (bilal)
// Routes import
const userRoutes = require("./routes/userRoutes");




<<<<<<< HEAD
// Define your routes
=======

>>>>>>> 131a352 (bilal)
app.use("/api/user", userRoutes);
















const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
