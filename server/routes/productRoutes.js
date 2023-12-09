const express = require("express");
// const { authMiddleware } = require('../middlewares/authMiddleware');
const { createProduct, deleteProduct, getProduct, getProducts } = require('../controllers/productCtrl');

const router = express.Router();

router.post("/",  createProduct);
router.delete("/:id",  deleteProduct);
router.get("/single/:id", getProduct);
router.get("/", getProducts);



module.exports = router;
