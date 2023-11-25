// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

mongoose.connect(
  // Your MongoDB connection string
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const Product = mongoose.model('Product', { name: String });

app.post('/api/add-product', async (req, res) => {
  const { name } = req.body;
  const newProduct = new Product({ name });
  await newProduct.save();
  res.send('Product added successfully!');
});

app.get('/api/search-products/:term', async (req, res) => {
  const { term } = req.params;
  const result = await Product.find({
    name: { $regex: new RegExp(term), $options: 'i' },
  });
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
