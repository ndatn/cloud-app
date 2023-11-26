// AddProduct.js
import React, { useState } from 'react';
import ProductService from '../server/ProductService';

const AddProduct = ({ onAdd }) => {
  const [productName, setProductName] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const newProduct = {
      name: productName,
    };

    try {
      await ProductService.addProduct(newProduct);
      onAdd(newProduct); // Assuming the ProductService returns the added product
      setProductName('');

      // Reload the page after adding the product
      window.location.reload();
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error if needed
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={e => setProductName(e.target.value)}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddProduct;
