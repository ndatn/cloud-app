// App.js
import React, { useState } from 'react';
import AddProduct from './app/AddProduct';
import SearchProducts from './app/SearchProducts';

function App() {
  const [products, setProducts] = useState([]);

  const addProduct = productName => {
    setProducts([...products, productName]);
  };

  const searchProducts = term => {
    const result = products.filter(product =>
      product.toLowerCase().includes(term.toLowerCase())
    );
    console.log('Search result:', result);
  };

  return (
    <div>
      <h1>Cloud Application</h1>
      <AddProduct onAddProduct={addProduct} />
      <SearchProducts onSearchProducts={searchProducts} />
    </div>
  );
}

export default App;
