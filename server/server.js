const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(cors());

const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGODB_URL, {
  dbName: 'Productdb',
});

const productSchema = new mongoose.Schema({
  name: String,
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
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
