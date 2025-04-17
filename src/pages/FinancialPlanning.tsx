import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';

interface FinancialPlanningForm {
  businessType: string;
  initialInvestment: string;
  monthlyExpenses: string;
  revenueGoals: string;
}

interface AIResponse {
  financialProjections?: string;
  fundingOptions?: string;
  riskAnalysis?: string;
  recommendations?: string[];
  error?: string;
}

function FinancialPlanning() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FinancialPlanningForm>({
    businessType: '',
    initialInvestment: '',
    monthlyExpenses: '',
    revenueGoals: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setAiResponse(null);

    try {
      const response = await fetch('https://omar44.app.n8n.cloud/webhook/financial-planning', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit data: ${response.statusText}`);
      }

      const data = await response.json();
      setAiResponse(data);
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  const renderAIResponse = () => {
    if (!aiResponse) return null;

    return (
      <div className="mt-8 space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900">Financial Analysis Results</h3>
        
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
    );
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6">Financial Planning</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
                What type of business are you planning?
              </label>
              <input
                type="text"
                id="businessType"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Restaurant, Online Store, Consulting"
                value={formData.businessType}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="initialInvestment" className="block text-sm font-medium text-gray-700 mb-2">
                How much can you invest initially?
              </label>
              <input
                type="text"
                id="initialInvestment"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., £10,000"
                value={formData.initialInvestment}
                onChange={(e) => setFormData({ ...formData, initialInvestment: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="monthlyExpenses" className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Monthly Expenses
              </label>
              <input
                type="text"
                id="monthlyExpenses"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., £2,000"
                value={formData.monthlyExpenses}
                onChange={(e) => setFormData({ ...formData, monthlyExpenses: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="revenueGoals" className="block text-sm font-medium text-gray-700 mb-2">
                What are your revenue goals?
              </label>
              <input
                type="text"
                id="revenueGoals"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., £5,000 per month"
                value={formData.revenueGoals}
                onChange={(e) => setFormData({ ...formData, revenueGoals: e.target.value })}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium ${
                isLoading || !isFormValid
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 transform hover:scale-105 transition-all duration-200'
              }`}
            >
              {isLoading ? (
                'Analyzing Finances...'
              ) : (
                <>
                  Get Financial Analysis
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </form>

          {renderAIResponse()}
        </div>
      </div>
    </main>
  );
}

export default FinancialPlanning;