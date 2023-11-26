// DeleteProduct.js
import React from 'react';
import ProductService from '../server/ProductService';

const DeleteProduct = ({ productId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await ProductService.deleteProduct(productId);
      onDelete(productId);
    } catch (error) {
      console.error('Error deleting product:', error);
      // Handle error if needed
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteProduct;
