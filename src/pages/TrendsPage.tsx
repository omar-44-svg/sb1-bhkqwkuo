import React from 'react';
import { useNavigate } from 'react-router-dom';

function TrendsPage() {
  const navigate = useNavigate();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Trending Side Hustles</h2>
            <button 
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back to Home
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What type of side hustle interests you?
              </label>
              <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white">
                <option value="">Select a category</option>
                <option value="digital">Digital & Online</option>
                <option value="creative">Creative & Artistic</option>
                <option value="service">Service-based</option>
                <option value="retail">Retail & E-commerce</option>
              </select>
            </div>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
              Show Trending Opportunities
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default TrendsPage;