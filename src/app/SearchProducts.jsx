// SearchProducts.js
import React, { useState } from 'react';

const SearchProducts = ({ onSearchProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchProducts = async () => {
    try {
      const response = await fetch(`/api/search-products/${searchTerm}`);
      const result = await response.json();
      console.log('Search result:', result);
      onSearchProducts(searchTerm);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Products"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearchProducts}>Search</button>
    </div>
  );
};

export default SearchProducts;
