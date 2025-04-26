import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AIResponse {
  financialProjections?: string;
  fundingOptions?: string;
  riskAnalysis?: string;
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
            {aiResponse.financialProjections && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Financial Projections</h4>
                <p className="text-gray-600">{aiResponse.financialProjections}</p>
              </div>
            )}

            {aiResponse.fundingOptions && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Funding Options</h4>
                <p className="text-gray-600">{aiResponse.fundingOptions}</p>
              </div>
            )}

            {aiResponse.riskAnalysis && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Risk Analysis</h4>
                <p className="text-gray-600">{aiResponse.riskAnalysis}</p>
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