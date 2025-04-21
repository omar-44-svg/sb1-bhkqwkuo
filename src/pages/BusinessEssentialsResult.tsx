import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BarChart4, Target, Users } from "lucide-react";

export default function MarketAnalysisResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentState, competition, targetMarket } = location.state || {};

  const [selectedCard, setSelectedCard] = useState<null | "currentState" | "competition" | "targetMarket">(null);

  const cards = [
    {
      key: "currentState",
      title: "Current State Analysis",
      description: "Analyze the current state of your target industry and market conditions",
      icon: <BarChart4 className="text-green-600 w-6 h-6" />,
      data: currentState,
    },
    {
      key: "competition",
      title: "Competition Analysis",
      description: "Understand your competitors and identify market opportunities",
      icon: <Target className="text-green-600 w-6 h-6" />,
      data: competition,
    },
    {
      key: "targetMarket",
      title: "Target Market Analysis",
      description: "Define and analyze your target market demographics and preferences",
      icon: <Users className="text-green-600 w-6 h-6" />,
      data: targetMarket,
    },
  ];

  if (selectedCard) {
    const cardData = cards.find((c) => c.key === selectedCard);
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">{cardData?.title}</h2>
        <pre className="bg-white p-4 rounded shadow overflow-auto text-sm">
          {JSON.stringify(cardData?.data, null, 2)}
        </pre>
        <button
          onClick={() => setSelectedCard(null)}
          className="mt-4 bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded"
        >
          ← Back to Cards
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Market Analysis Results</h1>
      <div className="space-y-4">
        {cards.map((card) => (
          <div
            key={card.key}
            onClick={() => setSelectedCard(card.key as any)}
            className="p-4 rounded-xl shadow-sm cursor-pointer border flex items-start space-x-3 transition hover:shadow-md border-gray-200"
          >
            <div>{card.icon}</div>
            <div>
              <h2 className="font-semibold">{card.title}</h2>
              <p className="text-sm text-gray-600">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
