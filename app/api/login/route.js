// app/api/login/route.js
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const filePath = path.join(process.cwd(), 'users.json');
    
    // Read the users file
    const fileData = await fs.readFile(filePath, 'utf8');
    const users = JSON.parse(fileData);
    
    // Check if user exists and password matches
    const user = users.find(u => 
      u.username === username && u.password === password
    );
    
    if (user) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
