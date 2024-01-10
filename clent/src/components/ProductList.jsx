import React, { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';
import DeleteProduct from './DeleteProduct';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
  const handleRefresh = () => {
    window.location.reload();
  };
  const handleSearch = () => {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px', textAlign: 'center' }}>
        <label>Search:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleRefresh}>Refresh</button>
      </div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Product List
      </h2>
      <ul style={{ listStyle: 'none', padding: 0, textAlign: 'center' }}>
        {products.map(product => (
          <li
            key={product._id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '5px',
              padding: '10px',
              marginBottom: '10px',
            }}
          >
            <h3>{product.name}</h3>
            <p>
              Quantity: {product.quantity} - Price: {product.price} - Category:{' '}
              {product.category}
            </p>
            <p>Description: {product.description}</p>
            <img
              src={product.image}
              alt={`Product: ${product.name}`}
              style={{
                maxWidth: '100%',
                maxHeight: '200px',
                marginBottom: '10px',
              }}
            />
            <br />
            <DeleteProduct productId={product._id} onDelete={handleDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
