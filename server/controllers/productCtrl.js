const Product = require('../models/productModels');

const createProduct = async (req, res, next) => {
  try {
    console.log('req.user:', req.user);

    const { productName, desc, images, quantity, asin, price, urlLink, category } = req.body;

    const newProduct = new Product({
      productName,
      desc,
      images,
      quantity: quantity || 0,
      asin: asin || 0,
      price: price || 0,
      urlLink: urlLink || 'https://example.com',
      category,
      // ...(req.user && { addedBy: req.user._id }),
      approved: false,
      status: 'pending',
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({ success: true, message: 'Product created successfully', data: savedProduct });
  } catch (error) {
    console.error('Error creating Product:', error);
    next(new Error(`Internal Server Error: Unable to create Product. ${error.message}`));
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const productToDelete = await Product.findById(req.params.id);

    if (!productToDelete) {
      return next(new Error('Product not found'));
    }

    if (productToDelete.edBy.toString() !== req.user._id.toString()) {
      return next(new Error('Unauthorized access: You do not have permission to delete this Product'));
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Product has been deleted!' });
  } catch (error) {
    console.error('Error deleting Product:', error);
    next(new Error('Internal Server Error: Unable to delete Product'));
  }
};

const getProduct = async (req, res, next) => {
  try {
    const productInstance = await Product.findById(req.params.id);

    if (!productInstance) {
      return next(new Error('Product not found'));
    }

    if (productInstance.edBy.toString() !== req.user._id.toString()) {
      return next(new Error('Unauthorized access: You do not have permission to view this Product'));
    }

    res.status(200).json(productInstance);
  } catch (error) {
    console.error('Error fetching Product:', error);
    next(new Error('Internal Server Error: Unable to fetch Product'));
  }
};

const getProducts = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.minStock && { quantity: { $gte: q.minStock } }),
  };

  try {
    const products = await Product.find(filters).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching Products:', error);
    next(new Error('Internal Server Error: Unable to fetch Products'));
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
};
