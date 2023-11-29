// Navigate.js
import React from 'react';
import ProductList from '../components/ProductList';
import AddProduct from '../components/AddProduct';

const Navigate = ({ products, onAddProduct }) => {
  return (
    <div>
      <AddProduct onAdd={onAddProduct} />
      <ProductList products={products} />
    </div>
  );
};

export default Navigate;
