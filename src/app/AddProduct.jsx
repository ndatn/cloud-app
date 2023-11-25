// AddProduct.js
import React, { useState } from 'react';

const AddProduct = ({ onAddProduct }) => {
  const [productName, setProductName] = useState('');

  const handleAddProduct = async () => {
    try {
      const response = await fetch('/api/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: productName }),
      });
      const result = await response.json();
      console.log(result);
      onAddProduct(productName);
      setProductName('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={e => setProductName(e.target.value)}
      />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default AddProduct;
