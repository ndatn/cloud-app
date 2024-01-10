import React, { useState } from 'react';
import ProductService from '../services/ProductService';

const AddProduct = ({ onAdd }) => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  const handleImageChange = e => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const newProduct = {
      name: productName,
      quantity,
      price,
      description,
      image,
      category,
    };

    try {
      await ProductService.addProduct(newProduct);
      onAdd(newProduct);

      setProductName('');
      setQuantity(0);
      setPrice(0);
      setDescription('');
      setImage('');
      setCategory('');
      window.location.reload();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={e => setProductName(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '10px', textAlign: 'center' }}>
          <button type="submit" style={{ padding: '5px 10px' }}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
