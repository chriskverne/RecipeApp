// /pages/api/meal/route.js

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q'); // get the 'q' parameter from the query

  // Edamam API credentials
  const application_id = '2dfd7330'; // Replace with your actual App ID
  const application_key = '0e1dcbf656f2d543f3608d0823e7c025'; // Replace with your actual App Key

  if (!query) 
    return new Response(JSON.stringify({ error: 'Query is required' }));
  
  try {
    const edamamResponse = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${application_id}&app_key=${application_key}`);
    if (!edamamResponse.ok) 
      return new Response(JSON.stringify({ error: 'Failed to fetch recipes from Edamam' }));
    
    const data = await edamamResponse.json();    
    return new Response(JSON.stringify(data));
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching recipes' }));
  }
}
