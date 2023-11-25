// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch data from the cloud database on component mount
    axios
      .get('/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from the server', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const addProduct = () => {
    // Send a POST request to add a new product to the cloud database
    axios
      .post('/api/products', { name: newProduct })
      .then(response => {
        setProducts([...products, response.data]);
        setNewProduct('');
      })
      .catch(error => {
        console.error('Error adding product', error);
      });
  };

  const searchProducts = () => {
    // Send a GET request to search products in the cloud database based on searchTerm
    axios
      .get(`/api/products?search=${searchTerm}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error searching products', error);
      });
  };

  return (
    <div>
      <h1>Product Management</h1>
      <div>
        <input
          type="text"
          placeholder="Add a new product"
          value={newProduct}
          onChange={e => setNewProduct(e.target.value)}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search for a product"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button onClick={searchProducts}>Search Products</button>
      </div>
    </div>
  );
}

export default App;
