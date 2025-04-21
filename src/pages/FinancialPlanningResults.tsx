import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AIResponse {
  label?: string;
  value?: string;
  icon?: string;
  charts?: string;
  revenue?: string;
  expenses?: string;
  idealPlanMarkdown?: string;
  tailoredPlanMarkdown?: string;
  cards?: { label: string; value: string; icon?: string }[]; // Assuming cards is an array
  recommendations?: string[];
  error?: string;
}

function FinancialResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const aiResponse = location.state?.aiResponse as AIResponse;

  if (!aiResponse) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">No Analysis Results Found</h2>
              <p className="text-gray-600 mb-6">Please submit the financial planning form to see results.</p>
              <button
                onClick={() => navigate('/financial-planning')}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Go to Financial Planning
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Financial Analysis Results</h2>
            <div className="space-x-4">
              <button 
                onClick={() => navigate('/financial-planning')}
                className="text-gray-600 hover:text-gray-800"
              >
                ← Back to Financial Planning
              </button>
              <button 
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-800"
              >
                ← Back to Home
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {aiResponse.label && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Label</h4>
                <p className="text-gray-600">{aiResponse.label}</p>
              </div>
            )}

            {aiResponse.value && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Value</h4>
                <p className="text-gray-600">{aiResponse.value}</p>
              </div>
            )}

            {aiResponse.icon && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Icon</h4>
                <p className="text-gray-600">{aiResponse.icon}</p>
              </div>
            )}

            {aiResponse.charts && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Charts</h4>
                <p className="text-gray-600">{aiResponse.charts}</p>
              </div>
            )}

            {aiResponse.revenue && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Revenue</h4>
                <p className="text-gray-600">{aiResponse.revenue}</p>
              </div>
            )}

            {aiResponse.expenses && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Expenses</h4>
                <p className="text-gray-600">{aiResponse.expenses}</p>
              </div>
            )}

            {aiResponse.idealPlanMarkdown && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Ideal Plan</h4>
                <div
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ __html: aiResponse.idealPlanMarkdown }}
                />
              </div>
            )}

            {aiResponse.tailoredPlanMarkdown && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Tailored Plan</h4>
                <div
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ __html: aiResponse.tailoredPlanMarkdown }}
                />
              </div>
            )}

            {/* Cards Section */}
            {aiResponse.cards && aiResponse.cards.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Cards</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aiResponse.cards.map((card, index) => (
                    <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg">
                      {card.icon && <img src={card.icon} alt={card.label} className="h-12 w-12 mx-auto mb-4" />}
                      <h5 className="text-xl font-semibold text-gray-700">{card.label}</h5>
                      <p className="text-gray-600">{card.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {aiResponse.recommendations && aiResponse.recommendations.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Recommendations</h4>
                <ul className="list-disc list-inside space-y-1">
                  {aiResponse.recommendations.map((recommendation, index) => (
                    <li key={index} className="text-gray-600">{recommendation}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default FinancialResults;
