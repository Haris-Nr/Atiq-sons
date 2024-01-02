const Product = require("../models/productModels");
const cloudinary = require("../config/cloudinary");
const User = require("../models/userModel");
const Track = require("../models/trackModels");
const { createNotification } = require("../util/notification");

// add product
const createProduct = async (req, res) => {
  try {
    // find product by asin NO
    const findproduct = await Product.findOne({ asin: req.body.asin });
    if (findproduct) {
      throw new Error("Product already in product list");
    }

    let result;

    try {
      result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Atiq-sons",
        use_filename: true,
        quality: "auto",
        fetch_format: "auto",
      });
    } catch (uploadError) {
      throw new Error("Error uploading image to Cloudinary");
    }

    const newProduct = new Product({
      ...req.body,
      image: [
        {
          url: result.secure_url,
          publicId: result.public_id,
        },
      ],
    });

    await newProduct.save();

    const user = await User.find(newProduct.createdBy);
    const io = req.app.get('io');

    await createNotification(
      io,
      "admin",
      null,
      `New product added by ${user[0].fullname}`,
      "New Product",
      user[0]._id,
      `${newProduct.image[0].url}`,
      `/products`
    );

    res.status(201).json({
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
const fetchProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skipIndex = (page - 1) * limit;

    if (!req.body.createdBy) {
      throw new Error("Creator ID (createdBy) must be provided");
    }

    const query = { createdBy: req.body.createdBy };

    const totalCount = await Product.countDocuments(query);

    const products = await Product.find(query)
      .populate("createdBy")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skipIndex);

    if (!products.length) {
      throw new Error("No products found");
    }

    res.json({
      success: true,
      data: products,
      pageInfo: {
        totalItems: totalCount,
        currentPage: page,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// all products
const allProduct = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }

    const publicId = product.image[0].publicId;

    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });

    await Product.findByIdAndDelete(id);

    const user = await User.findById(req.body.userId);

    let employe;

    let admin;

    if (user.role === "admin") {
      employe = product.createdBy;
    } else if (user.role === "employee") {
      admin = "admin";
    }
    const io = req.app.get('io');


    await createNotification(
      io,
      admin ? admin : null,
      employe ? employe : null,
      ` ${product.productName} deleted`,
      `${user.fullname} deleted this Product`,
      user._id,
      `${product.image[0].url}`,
      `/product`
    );

    res.status(200).json({
      success: true,
      message: "Product has been deleted!",
    });
  } catch (error) {
    res.status(500).json({
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
    res.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/* change product status */
const changeStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      status,
    });

    // const user = await User.find(updatedProduct.createdBy);
    const admin = await User.findById(req.body.userId);
    // send notification to seller
    const io = req.app.get('io');

    await createNotification(
      io,
      null,
      updatedProduct.createdBy,
      `Your product ${updatedProduct.productName} has been ${status} by ${admin.fullname}`,
      "Product Status Updated",
      admin._id,
      `${updatedProduct.image[0].url}`,
      `/product`
    );

    res.json({
      success: true,
      message: "Product status updated successfully",
    });
  } catch (error) {
    res.json({
      succuess: false,
      message: error.message,
    });
  }
};

/* Get a single product by id */
const singleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("createdBy");
    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.json({
      succuess: false,
      message: error.message,
    });
  }
};

/// change track status 
const changeTrackStatus = async (req, res) => {
  try {
    const { tracking } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      tracking,
    });

    // const user = await User.find(updatedProduct.createdBy);
    const admin = await User.findById(req.body.userId);
    // send notification to seller
    const io = req.app.get('io');
    await createNotification(
      io,
      null,
      updatedProduct.createdBy,
      `Your product ${updatedProduct.productName} has been ${tracking} by ${admin.fullname}`,
      "Product Status Updated",
      admin._id,
      `${updatedProduct.image[0].url}`,
      `/product`
    );

    res.json({
      success: true,
      message: "Product Tracking Start successfully",
    });
  } catch (error) {
    res.json({
      succuess: false,
      message: error.message,
    });
  }
};

// track product
const trackProduct = async (req, res) => {
  try {
    const { productName, date, quantity,  } = req.body;

    const newTrack = new Track({
      productName: productName,
      date: date,
      quantity: quantity,
    });

    // Save the track record to the database
    const savedTrack = await newTrack.save();
  res.json({
    success: true,
    data: savedTrack,
  });
} catch (error) {
  res.json({
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
  changeTrackStatus,
  trackProduct
};
