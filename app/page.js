"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        // Login request
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
          router.push('/inventory');
        } else {
          setError('Invalid username or password');
        }
      } else {
        // Register request
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
          setIsLogin(true);
          setError('Registration successful! Please log in.');
        } else {
          setError('Username already exists');
        }
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Create Account'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600"
          >
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-sm text-blue-500 hover:underline w-full text-center"
        >
          {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
        </button>
      </div>
    </main>
  );
};

export default Login;