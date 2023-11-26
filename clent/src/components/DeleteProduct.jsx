import React from 'react';
import ProductService from '../services/ProductService';

const DeleteProduct = ({ productId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await ProductService.deleteProduct(productId);
      onDelete(productId);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteProduct;
