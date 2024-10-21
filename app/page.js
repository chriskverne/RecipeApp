'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [inputQuery, setInputQuery] = useState(''); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [loading, setLoading] = useState(false);

  // Fetch recipes based on searchQuery from your own backend
  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/meal?q=${searchQuery}`);
      if (!response.ok) 
        throw new Error(`Error: ${response.status}`);
      
      const data = await response.json();
      if (data.hits) {
        setRecipes(data.hits); // The API returns an array of recipe "hits"
      } else {
        setRecipes([]); // If no recipes are returned, set an empty array
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // This effect will run every time `searchQuery` changes
  useEffect(() => {
    if (searchQuery) {
      fetchRecipes();
    }
  }, [searchQuery]);

  const handleSearch = () => {
    setSearchQuery(inputQuery); // Update the search query when the button is clicked
  };

  return (
    <main className="">
      <div className='w-full flex justify-center mt-8 bg-red-500'>
        <Link href={'/inventory'}>Link to inventory page</Link>
      </div>

      <h1>Recipe Search</h1>
      <input
        type="text"
        value={inputQuery}
        onChange={(e) => setInputQuery(e.target.value)}
        placeholder="Search for a recipe"
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}

      <div>
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div key={index}>
              <h3>{recipe.recipe.label}</h3>
              <img src={recipe.recipe.image} alt={recipe.recipe.label} />
              <p>{recipe.recipe.source}</p>
              <a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer">
                View Recipe
              </a>
            </div>
          ))
        ) : (
          <p>No recipes found</p>
        )}
      </div>
    </main>
  );
}
