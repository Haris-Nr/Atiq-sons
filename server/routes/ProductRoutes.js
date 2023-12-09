const express = require("express");
const router = express.Router();
const { createAddProduct, deleteAddProduct, getAddProduct, getAddProducts } = require('../controllers/ProductCtrl');


router.post("/addproduct", createAddProduct);
router.delete("/edit/:id", deleteAddProduct);
router.get("/single/:id", getAddProduct);
router.get("/allproduct", getAddProducts);



module.exports = router;
