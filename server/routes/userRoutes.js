const express = require("express");
const { createUser, loginUser, getEmployee, updatedEmployee, deleteEmployee, getAllUsers, fetchUser } = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/signup",createUser);
router.post("/login",loginUser);
router.get("/allusers",getAllUsers);
router.get("/getemployee",getEmployee)
router.patch("/reset-password",updatedEmployee);
router.delete("/delete/:id",deleteEmployee);
router.get("/currentuser",authMiddleware,fetchUser);





module.exports = router;