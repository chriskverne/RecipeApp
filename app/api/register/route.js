// app/api/register/route.js
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const filePath = path.join(process.cwd(), 'users.json');
    
    // Read existing users
    let users = [];
    try {
      const fileData = await fs.readFile(filePath, 'utf8');
      users = JSON.parse(fileData);
    } catch (error) {
      // File doesn't exist yet, will create it
    }
    
    // Check if username already exists
    if (users.some(u => u.username === username)) {
      return NextResponse.json(
        { success: false, error: 'Username already exists' },
        { status: 400 }
      );
    }
    
    // Add new user
    users.push({ username, password });
    
    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}