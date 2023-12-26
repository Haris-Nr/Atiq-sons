const Product = require("../models/productModels");
const cloudinary = require("../config/cloudinary");
const User = require("../models/userModel");
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

    await createNotification(
      "admin",
      null,
      `New product added by ${user[0].fullname}`,
      "New Product",
      user[0]._id,
      `${newProduct.image[0].url}`
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

    const user = await User.find(product.createdBy);

    await createNotification(
      "admin",
      null,
      ` ${product.productName} deleted`,
      `${user[0].fullname} deleted this Product`,
      user[0]._id,
      `${product.image[0].url}`
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

    const user = await User.find(updatedProduct.createdBy);
    // send notification to seller
    await createNotification(
      null,
      updatedProduct.createdBy,
      `Your product ${updatedProduct.productName} has been ${status}`,
      "Product Status Updated",
      user[0]._id,
      `${updatedProduct.image[0].url}`
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

module.exports = {
  createProduct,
  fetchProducts,
  deleteProduct,
  updateProduct,
  changeStatus,
  singleProduct,
  allProduct,
};
