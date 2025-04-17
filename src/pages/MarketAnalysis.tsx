import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';

interface MarketAnalysisForm {
  industry: string;
  targetMarket: string;
  operationType: 'online' | 'physical' | '';
  location: string;
}

interface AIResponse {
  marketSize?: string;
  competitorAnalysis?: string;
  targetAudience?: string;
  recommendations?: string[];
  error?: string;
}

function MarketAnalysis() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<MarketAnalysisForm>({
    industry: '',
    targetMarket: '',
    operationType: '',
    location: ''
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
      const response = await fetch('https://omar44.app.n8n.cloud/webhook/market-analysis', {
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
        <h3 className="text-xl font-semibold text-gray-900">Market Analysis Results</h3>
        
        {aiResponse.marketSize && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Market Size & Potential</h4>
            <p className="text-gray-600">{aiResponse.marketSize}</p>
          </div>
        )}

        {aiResponse.competitorAnalysis && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Competitor Analysis</h4>
            <p className="text-gray-600">{aiResponse.competitorAnalysis}</p>
          </div>
        )}

        {aiResponse.targetAudience && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Target Audience Insights</h4>
            <p className="text-gray-600">{aiResponse.targetAudience}</p>
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
          <h2 className="text-2xl font-semibold mb-6">Market Analysis</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                What industry are you interested in?
              </label>
              <input
                type="text"
                id="industry"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Restaurant, E-commerce, Technology"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="targetMarket" className="block text-sm font-medium text-gray-700 mb-2">
                Who is your target market?
              </label>
              <textarea
                id="targetMarket"
                className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                placeholder="Describe your ideal customers (age, interests, income level, etc.)"
                value={formData.targetMarket}
                onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
              ></textarea>
            </div>

            <div>
              <label htmlFor="operationType" className="block text-sm font-medium text-gray-700 mb-2">
                How do you plan to operate your business?
              </label>
              <select
                id="operationType"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                value={formData.operationType}
                onChange={(e) => setFormData({ ...formData, operationType: e.target.value as 'online' | 'physical' })}
              >
                <option value="">Select operation type</option>
                <option value="online">Online - Sell products/services through the internet</option>
                <option value="physical">Physical Location - Operate from a brick-and-mortar establishment</option>
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Where do you plan to operate?
              </label>
              <input
                type="text"
                id="location"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="City or region"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                'Analyzing Market...'
              ) : (
                <>
                  Get Market Analysis
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

export default MarketAnalysis;