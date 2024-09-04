'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        if (data.categories) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const fetchMealBySearch = async () => {
    try {
      const response = await fetch(`/api/meal?meal=${searchTerm}`);
      const data = await response.json();
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.error('Failed to fetch meal:', error);
    }
  };

  // Use useEffect to fetch meals when the selectedCategory changes
  useEffect(() => {
    const fetchMealsByCategory = async () => {
      if (selectedCategory) {
        try {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
          const data = await response.json();
          if (data.meals) {
            setMeals(data.meals);
          } else {
            setMeals([]);
          }
        } catch (error) {
          console.error('Failed to fetch meals by category:', error);
        }
      }
    };

    fetchMealsByCategory();
  }, [selectedCategory]); // Trigger the effect whenever selectedCategory changes

  return (
    <main className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a meal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border"
        />
        <button onClick={fetchMealBySearch} className="ml-2 p-2 bg-blue-500 text-white">
          Search Meal
        </button>
      </div>

      <div className="mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.idCategory} value={category.strCategory}>
              {category.strCategory}
            </option>
          ))}
        </select>
      </div>

      {meals.length > 0 && (
        <div className="mt-4">
          {meals.map((meal, index) => (
            <div key={index} className="mb-4">
              <h2>{meal.strMeal}</h2>
              <img src={meal.strMealThumb} alt={meal.strMeal} width={200} />
              {meal.strInstructions && <p>{meal.strInstructions}</p>}
            </div>
          ))}
        </div>
      )}

      {meals.length === 0 && (searchTerm || selectedCategory) && (
        <div className="mt-4">
          <p>No meal found. Try a different search term or category.</p>
        </div>
      )}
    </main>
  );
}
