// ProductList.js
import React, { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';
import DeleteProduct from './DeleteProduct';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ProductService.getProducts();
      setProducts(data);
    };

    fetchData();
  }, []);

  const handleDelete = productId => {
    setProducts(prevProducts =>
      prevProducts.filter(product => product._id !== productId)
    );
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} -{' '}
            <DeleteProduct productId={product._id} onDelete={handleDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
