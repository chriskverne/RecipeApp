'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(''); // Store current user
  const [showSaved, setShowSaved] = useState(false);

  const deleteRecipe = async (recipeLabel) => {
    try {
      const response = await fetch(`/api/recipes?label=${encodeURIComponent(recipeLabel)}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update the local state to remove the deleted recipe
        setSavedRecipes(savedRecipes.filter(recipe => recipe.label !== recipeLabel));
        alert('Recipe removed successfully!');
      } else {
        alert('Failed to remove recipe');
      }
    } catch (error) {
      console.error('Error removing recipe:', error);
      alert('Error removing recipe');
    }
  };

  // Fetch user's saved recipes
  const fetchSavedRecipes = async () => {
    try {
      const response = await fetch('/api/recipes');
      if (response.ok) {
        const data = await response.json();
        setSavedRecipes(data.recipes || []);
        setUsername(data.username);
      }
    } catch (error) {
      console.error('Error fetching saved recipes:', error);
    }
  };

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/meal?q=${searchQuery}`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      
      const data = await response.json();
      if (data.hits) {
        setRecipes(data.hits);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchRecipes();
    }
  }, [searchQuery]);

  const handleSearch = () => {
    setSearchQuery(inputQuery);
    setShowSaved(false);
  };

  const handleLogout = () => {
    router.push('/'); // Redirect to main page
  };

  const saveRecipe = async (recipe) => {
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipe: {
            label: recipe.recipe.label,
            image: recipe.recipe.image,
            source: recipe.recipe.source,
            url: recipe.recipe.url
          }
        }),
      });

      if (response.ok) {
        await fetchSavedRecipes();
        alert('Recipe saved successfully!');
      } else {
        alert('Failed to save recipe');
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Error saving recipe');
    }
  };

  const RecipeCard = ({ recipe, isSaved, onSave, onDelete }) => (
    <div className="border rounded-lg p-4 m-2 max-w-sm">
      <h3 className="font-bold text-lg mb-2">{recipe.label}</h3>
      <img 
        src={recipe.image} 
        alt={recipe.label} 
        className="w-full h-48 object-cover rounded mb-2"
      />
      <p className="text-gray-600 mb-2">{recipe.source}</p>
      <div className="flex gap-2">
        <a 
          href={recipe.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Recipe
        </a>
        {!isSaved && onSave && (
          <button
            onClick={onSave}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save Recipe
          </button>
        )}
        {isSaved && onDelete && (
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
  
  return (
    <div>
      {/* Navigation remains the same */}
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">Recipe Manager</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Search controls remain the same */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Recipe Search</h1>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Search for a recipe"
              className="flex-1 p-2 border rounded"
            />
            <button 
              onClick={handleSearch}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Search
            </button>
            <button 
              onClick={() => setShowSaved(true)}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              View Saved
            </button>
            <button 
              onClick={() => setShowSaved(false)}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Search New
            </button>
          </div>
        </div>

        {loading && <p className="text-center">Loading...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {showSaved ? (
            savedRecipes.length > 0 ? (
              savedRecipes.map((recipe, index) => (
                <RecipeCard 
                  key={index} 
                  recipe={recipe} 
                  isSaved={true}
                  onDelete={() => deleteRecipe(recipe.label)}
                />
              ))
            ) : (
              <p>No saved recipes found</p>
            )
          ) : (
            recipes.length > 0 ? (
              recipes.map((recipe, index) => (
                <RecipeCard 
                  key={index} 
                  recipe={recipe.recipe} 
                  isSaved={false}
                  onSave={() => saveRecipe(recipe)}
                />
              ))
            ) : (
              <p>No recipes found</p>
            )
          )}
        </div>
      </main>
    </div>
  );
  
}