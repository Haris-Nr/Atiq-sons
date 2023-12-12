const express = require("express");
// const { verifyToken } = require('../middlewares/errorHandler');
const { createAddProduct, deleteAddProduct, getAddProduct, getAddProducts } = require('../controllers/addproductCtrl');

const router = express.Router();

router.post("/", createAddProduct);
router.delete("/:id", deleteAddProduct);
router.get("/single/:id", getAddProduct);
router.get("/", getAddProducts);



module.exports = router;
