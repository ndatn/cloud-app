const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(cors());

const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.REACT_APP_PORT || 3002;
mongoose.connect(process.env.REACT_APP_MONGODB_URL, {
  dbName: 'Productdb',
});

const productSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  description: String,
  image: String,
  category: String,
});

const Product = mongoose.model('Product', productSchema);

app.use(bodyParser.json());

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(deletedProduct);
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const newProduct = await Product.create({
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
    });

    res.json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
