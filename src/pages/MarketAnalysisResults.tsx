// pages/MarketAnalysisResults.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function MarketAnalysisResults() {
  const location = useLocation();
  const navigate = useNavigate();

  const { currentState, competition, targetMarket } = location.state || {};

  if (!currentState || !competition || !targetMarket) {
    return (
      <div className="text-center mt-12 text-red-500">
        No results found. Please return to the form and try again.
      </div>
    );
  }

  const cards = [
    {
      title: 'Current State Analysis',
      summary: currentState,
      path: '/market-analysis/current-state',
    },
    {
      title: 'Competition Analysis',
      summary: competition,
      path: '/market-analysis/competition',
    },
    {
      title: 'Target Market Analysis',
      summary: targetMarket,
      path: '/market-analysis/target-market',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-700">Market Analysis Results</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white p-6 rounded shadow hover:shadow-lg cursor-pointer"
            onClick={() => navigate(card.path)}
          >
            <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
            <p className="text-sm text-gray-600 line-clamp-4">{card.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketAnalysisResults;
