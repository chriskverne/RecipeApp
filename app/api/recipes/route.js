// app/api/recipes/route.js
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

// Helper function to read users file
async function readUsersFile() {
  const filePath = path.join(process.cwd(), 'users.json');
  const fileData = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileData);
}

// Helper function to write to users file
async function writeUsersFile(users) {
  const filePath = path.join(process.cwd(), 'users.json');
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
}

// Get saved recipes for the current user
export async function GET() {
  try {
    // In a real app, you'd get the username from the session
    // For this demo, we'll just get the first user's recipes
    const users = await readUsersFile();
    if (users.length === 0) {
      return NextResponse.json({ recipes: [] });
    }

    const user = users[0]; // Get first user for demo
    return NextResponse.json({
      username: user.username,
      recipes: user.recipes || []
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    );
  }
}

// Save a new recipe for the current user
export async function POST(request) {
  try {
    const { recipe } = await request.json();
    const users = await readUsersFile();
    
    // In a real app, you'd get the current user from the session
    // For this demo, we'll just use the first user
    if (users.length === 0) {
      return NextResponse.json(
        { error: 'No users found' },
        { status: 404 }
      );
    }

    // Add recipe to first user's recipes
    if (!users[0].recipes) {
      users[0].recipes = [];
    }

    // Check if recipe already exists
    const recipeExists = users[0].recipes.some(
      r => r.label === recipe.label
    );

    if (!recipeExists) {
      users[0].recipes.push(recipe);
      await writeUsersFile(users);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Recipe already saved' },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save recipe' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const recipeLabel = searchParams.get('label');
    
    if (!recipeLabel) {
      return NextResponse.json(
        { error: 'Recipe label is required' },
        { status: 400 }
      );
    }

    const users = await readUsersFile();
    
    // For demo, use first user
    if (users.length === 0) {
      return NextResponse.json(
        { error: 'No users found' },
        { status: 404 }
      );
    }

    // Filter out the recipe with matching label
    users[0].recipes = users[0].recipes.filter(
      recipe => recipe.label !== recipeLabel
    );

    await writeUsersFile(users);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete recipe' },
      { status: 500 }
    );
  }
}