const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
require("dotenv").config();
<<<<<<< HEAD
=======
<<<<<<< HEAD
const { authMiddleware,errorHandler, } = require("./middlewares/authMiddleware");
=======

>>>>>>> 131a352 (bilal)
>>>>>>> refs/remotes/origin/main
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
const productRoutes = require("./routes/productRoutes")




<<<<<<< HEAD
// Define your routes
=======

>>>>>>> 131a352 (bilal)
app.use("/api/user", userRoutes);
app.use("/api/product",productRoutes)









const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
