const Product = require("../models/productModels");
const Notification = require("../models/notificationModel");
const cloudinary = require("../config/cloudinary");
const User = require("../models/userModel");

// add product
const createProduct = async (req, res) => {
  try {
    // find product by asin NO
    const findproduct = await Product.findOne({ asin: req.body.asin });
    if (findproduct) {
      throw new Error("Product already in product list");
    }

    let result

    try {
      result = await cloudinary.uploader.upload(req.file.path,{
        folder: "Atiq-sons"
      });
    } catch (uploadError) {
      throw new Error("Error uploading image to Cloudinary");
    }

   
    const newProduct = new Product({...req.body,image:result.secure_url});

    await newProduct.save();

    const user = await User.find(newProduct.createdBy);

    const admins = await User.find({ role: "admin"});
    admins.forEach(async (admin) => {
        const newNotification = new Notification({
          user: user[0]._id,
          message: `New product added by ${user[0].fullname}`,
          title: "New Product",
          onClick: `/admin`,
          seen: false, 
          image:`${newProduct.image}` 
        });
        await newNotification.save();
    });

    res.status(201).send({
      success: true,
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//fetch all products by specific employee
const fetchProducts =  async (req, res) => {
  try {
    const products = await Product.find({ createdBy: req.body.createdBy })
      .populate("createdBy").sort({ createdAt: -1 });
     
    if (!products) {
      throw new Error("No products found");
   }
    res.send({
      success: true,
      data: products,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};


// all products
const allProduct = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    const productsWithSellerInfo = await Promise.all(products.map(async (product) => {
      const seller = await User.findById(product.createdBy);
      return {
        ...product.toObject(),
        seller: seller ? seller.fullname : "Unknown Seller",
      };
    }));

    res.send({
      success: true,
      data: productsWithSellerInfo, 
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};




// delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Product has been deleted!",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

//update the existing product by id
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndUpdate(id, req.body);
    res.send({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

/* change product status */
const changeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedProduct =  await Product.findByIdAndUpdate(req.params.id, { status });
    
    const admins = await User.find({ role: "admin"});
    console.log(admins)
    // send notification to seller 
    const newNotification = new Notification({
      user: admins._id,
      message: `Your product ${updatedProduct.productName} has been ${status}`,
      title: "Product Status Updated",
      onClick: `/profile`,
      seen: false,
      image:`${updatedProduct.image}`  
    });
    await newNotification.save(); 

    res.send({
      success: true,
      message: "Product status updated successfully",
    });
  } catch (error) {
    res.send({
      succuess: false,
      message: error.message,
    });
  }
};

/* Get a single product by id */
const singleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('createdBy');
    res.send({
      success: true,
      data: product
    });
  } catch (error) {
    res.send({
      succuess: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  fetchProducts,
  deleteProduct,
  updateProduct,
  changeStatus,
  singleProduct,
  allProduct,
};
