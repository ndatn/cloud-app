// ProductService.js
import axios from 'axios';

// Vercel automatically provides the base URL for your deployed application
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://0.0.0.0:3001/api';

const ProductService = {
  getProducts: async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  addProduct: async productData => {
    try {
      const response = await axios.post(`${API_URL}/products`, productData);
      return response.data;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  deleteProduct: async productId => {
    try {
      await axios.delete(`${API_URL}/products/${productId}`);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },
};

export default ProductService;
