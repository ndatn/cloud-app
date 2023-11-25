import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('/api/products').then(response => {
      setProducts(response.data);
    });
  }, []);

  const addProduct = () => {
    axios.post('/api/products', { name: newProduct }).then(() => {
      setProducts([...products, newProduct]);
      setNewProduct('');
    });
  };

  const filteredProducts = products.filter(product =>
    product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Cloud App</h1>
      <input
        type="text"
        value={newProduct}
        onChange={e => setNewProduct(e.target.value)}
      />
      <button onClick={addProduct}>Add Product</button>
      <input
        type="text"
        placeholder="Search Products"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredProducts.map((product, index) => (
          <li key={index}>{product}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
