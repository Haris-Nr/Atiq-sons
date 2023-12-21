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
const productRoutes = require("./routes/productRoutes")
const notificationsRoute = require("./routes/notificationsRoute");
const taskRoute = require("./routes/taskRoutes");
const logRoute = require("./routes/logRoute");




// Define your routes
app.use("/api/user", userRoutes);
app.use("/api/product",productRoutes)
app.use("/api/notification", notificationsRoute);
app.use("/api/task",taskRoute)
app.use("/api/log",logRoute)






const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
