import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios'; 
import './styles/Category.css'; 

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);

  const categoriesUrl = `${process.env.REACT_APP_BACKEND_URL}/api/categories?page=${page}`;
  const markInterestUrl = `${process.env.REACT_APP_BACKEND_URL}/api/categories/mark`;

  // Use useCallback to memoize the fetchCategories function
  const fetchCategories = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.get(categoriesUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }, [categoriesUrl]); 

  const handleMark = async (categoryId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(markInterestUrl, { categoryId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories(); 
    } catch (error) {
      console.error("Failed to mark interest:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="main-container">
      <div className="protected-container">
        <h2>Please Mark Your Interest</h2>
        <p>We will keep you notified:</p>
        <div className="separator"></div>
        <div className="interests-list">
          {categories.map((category) => (
            <label key={category._id}>
              <input 
                type="checkbox" 
                checked={category.marked} 
                onChange={() => handleMark(category._id)} 
              />
              {category.name}
            </label>
          ))}
        </div>
        <div className="pagination">
          <button 
            disabled={page === 1} 
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span className={page === 1 ? 'active' : ''}>{page}</span>
          <button 
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;
