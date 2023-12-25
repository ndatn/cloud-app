import axios from 'axios';

console.log(process.env.REACT_APP_API_URL);

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api';

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
