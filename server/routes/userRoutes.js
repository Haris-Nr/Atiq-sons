const express = require("express");
const { createUser, loginUser, getAllemployees, getAdmin, updatedEmployee } = require("../controllers/userCtrl");
const router = express.Router();

router.post("/signup",createUser);
router.post("/login",loginUser);
router.get("/allemployees",getAllemployees);
router.get("/getadmin",getAdmin)
router.patch("/reset-password/",updatedEmployee);
// router.get("/:id",getaUser);
// router.delete("/:id",deleteaUser);





module.exports = router;