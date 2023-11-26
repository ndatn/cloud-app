// App.js
import React, { useState } from 'react';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';

const App = () => {
  const [products, setProducts] = useState([]);

  const handleAddProduct = addedProduct => {
    setProducts(prevProducts => [...prevProducts, addedProduct]);
  };

  return (
    <div>
      <AddProduct onAdd={handleAddProduct} />
      <ProductList products={products} />
    </div>
  );
};

export default App;
