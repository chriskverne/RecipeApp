// /pages/api/meal/route.js

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mealName = searchParams.get('meal') || ''; // Get the meal query parameter or default to an empty string

  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;

  try {
    // Fetch data from TheMealDB
    const response = await fetch(apiUrl);
    const data = await response.json();
    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch data from TheMealDB' }));
  }
}
