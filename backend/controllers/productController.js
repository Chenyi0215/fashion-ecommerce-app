import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  // 建立一個包含所有必填欄位預設值的商品物件
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id, // 從 protect 中間件取得登入的管理員ID
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    stock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  // 將這個包含完整資料的商品物件存入資料庫
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  // 這次我們不直接解構，因為我們不確定哪些欄位會被傳入
  const { name, price, description, image, brand, category, stock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    // ## 核心修正 ##
    // 檢查請求中是否有提供該欄位的值，如果有，才更新；
    // 如果沒有，就保持 product 物件中原有的值。
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.stock = stock || product.stock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductById,
  createProduct, 
  updateProduct, 
  deleteProduct, 
};