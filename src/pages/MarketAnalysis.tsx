import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, BarChart, Users } from 'lucide-react';

function MarketAnalysis() {
  const navigate = useNavigate();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Market Analysis</h2>
            <button 
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back to Home
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div 
              onClick={() => navigate('/market-analysis/current-state')}
              className="p-6 border border-gray-200 rounded-lg hover:border-green-500 cursor-pointer transition-all duration-200"
            >
              <div className="flex items-center mb-4">
                <BarChart className="h-6 w-6 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold">Current State Analysis</h3>
              </div>
              <p className="text-gray-600">Analyze the current state of your target industry and market conditions</p>
            </div>

            <div 
              onClick={() => navigate('/market-analysis/competition')}
              className="p-6 border border-gray-200 rounded-lg hover:border-green-500 cursor-pointer transition-all duration-200"
            >
              <div className="flex items-center mb-4">
                <Target className="h-6 w-6 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold">Competition Analysis</h3>
              </div>
              <p className="text-gray-600">Understand your competitors and identify market opportunities</p>
            </div>

            <div 
              onClick={() => navigate('/market-analysis/target-market')}
              className="p-6 border border-gray-200 rounded-lg hover:border-green-500 cursor-pointer transition-all duration-200"
            >
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold">Target Market Analysis</h3>
              </div>
              <p className="text-gray-600">Define and analyze your target market demographics and preferences</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MarketAnalysis;