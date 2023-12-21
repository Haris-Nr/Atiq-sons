const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminCheck = require("../middlewares/adminCheck");
const { createProduct, deleteProduct, updateProduct, fetchProducts, changeStatus, singleProduct, allProduct} = require('../controllers/productCtrl');
const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now().toString() + path.extname(file.originalname));
  },
});

  const upload = multer({ storage: storage });


router.post("/addproduct",authMiddleware,upload.single('image'),createProduct);
router.post("/fetchProductsbyemployee", authMiddleware,fetchProducts)
router.delete("/deleteproduct/:id",authMiddleware,deleteProduct);
router.patch("/updateProduct/:id", authMiddleware,updateProduct);
router.get("/fetchSingleProduct/:id", authMiddleware,singleProduct) 
router.patch("/changeProductStatus/:id", authMiddleware,adminCheck,changeStatus)
router.get("/fetchallProduct",authMiddleware,adminCheck,allProduct)




module.exports = router;
