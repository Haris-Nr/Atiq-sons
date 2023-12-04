const AddProduct = require('../models/addproductModels');
const createError = require('../middlewares/errorHandler');

const createAddProduct = async (req, res, next) => {
  try {
    const newAddProduct = new AddProduct({
      title: req.body.title,
      desc: req.body.desc,
      images: req.body.images || [],
      stock: req.body.stock || 0,
      isApproved: false,
    });

    const savedAddProduct = await newAddProduct.save();
    res.status(201).json(savedAddProduct);
  } catch (error) {
    next(createError(500, 'Error creating AddProduct'));
  }
};



const deleteAddProduct = async (req, res, next) => {
  try {
    const addProduct = await AddProduct.findById(req.params.id);

    if (!addProduct) {
      return next(createError(404, 'AddProduct not found!'));
    }

    // Additional checks, e.g., ownership validation
    // if (addProduct.userId !== req.userId) {
    //   return next(createError(403, 'You do not have permission to delete this AddProduct'));
    // }

    await AddProduct.findByIdAndDelete(req.params.id);
    res.status(200).send('AddProduct has been deleted!');
  } catch (error) {
    next(createError(500, 'Error deleting AddProduct'));
  }
};


const getAddProduct = async (req, res, next) => {
  try {
    const addProduct = await AddProduct.findById(req.params.id);

    if (!addProduct) {
      return next(createError(404, 'AddProduct not found!'));
    }

    res.status(200).json(addProduct);
  } catch (error) {
    next(createError(500, 'Error fetching AddProduct'));
  }
};


const getAddProducts = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.minStock && { stock: { $gte: q.minStock } }),
    // ...(q.search && { title: { $regex: q.search, $options: 'i' } }), // Filter by title search
  };

  try {
    const addProducts = await AddProduct.find(filters).sort({ createdAt: -1 });
    res.status(200).json(addProducts);
  } catch (error) {
    next(createError(500, 'Error fetching AddProducts'));
  }
};

module.exports = {
  createAddProduct,
  deleteAddProduct,
  getAddProduct,
  getAddProducts,
};
