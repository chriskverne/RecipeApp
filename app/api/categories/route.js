// /pages/api/categories/route.js

export async function GET(request) {
    const apiUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return new Response(JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching categories:', error);
      return new Response(JSON.stringify({ message: 'Failed to fetch categories' }));
    }
  }
  