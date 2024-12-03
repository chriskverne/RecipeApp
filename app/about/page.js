'use client';

import Link from "next/link";

export default function Aboutus() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Recipe Manager</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At Recipe Manager, we're passionate about connecting people with the perfect recipes for their needs. Through our partnership with the Edamam API, we provide access to over 2 million curated recipes from trusted sources worldwide.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Offer</h2>
            <ul className="text-gray-600 mb-6 space-y-3 leading-relaxed">
              <li>• Access to a vast library of diverse, high-quality recipes</li>
              <li>• Personalized recipe saving and organization</li>
              <li>• Detailed nutritional information for health-conscious cooking</li>
              <li>• User-friendly search interface for finding the perfect recipe</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Founded by food enthusiasts and tech innovators, Recipe Manager was born from a simple idea: making recipe discovery and management seamless and enjoyable. We believe that everyone deserves easy access to great recipes, whether you're a seasoned chef or just starting your culinary journey.
            </p>
          </div>

          <div className="text-center">
            <Link 
              href={'/'} 
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Return to Login Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}