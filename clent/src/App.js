// App.js
import React, { useState } from 'react';
import Navigate from './navigate/navigate';

const App = () => {
  const [products, setProducts] = useState([]);

  const handleAddProduct = addedProduct => {
    setProducts(prevProducts => [...prevProducts, addedProduct]);
  };

  return (
    <div>
      <Navigate products={products} onAddProduct={handleAddProduct} />
    </div>
  );
};

export default App;
