import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';

interface CompetitionAnalysisForm {
  industry: string;
  targetMarket: string;
  operationType: 'online' | 'physical' | '';
  scope: 'city' | 'country' | 'both' | '';
  city?: string;
  country?: string;
}

interface AIResponse {
  competitorOverview?: string;
  directCompetitors?: string[];
  indirectCompetitors?: string[];
  competitiveAdvantages?: string[];
  marketGaps?: string[];
}

function CompetitionAnalysis() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CompetitionAnalysisForm>({
    industry: '',
    targetMarket: '',
    operationType: '',
    scope: '',
    city: '',
    country: ''
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
      const response = await fetch('https://omar44.app.n8n.cloud/webhook/competition-analysis', {
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
      setAiResponse(data[0]); // ✅ Important fix
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    const baseFieldsValid = formData.industry.trim() !== '' && 
                            formData.targetMarket.trim() !== '' && 
                            formData.operationType !== '' && 
                            formData.scope !== '';

    if (!baseFieldsValid) return false;

    switch (formData.scope) {
      case 'city':
        return formData.city?.trim() !== '';
      case 'country':
        return formData.country?.trim() !== '';
      case 'both':
        return formData.city?.trim() !== '' && formData.country?.trim() !== '';
      default:
        return false;
    }
  };

  const renderLocationFields = () => {
    switch (formData.scope) {
      case 'city':
        return (
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              Which city will you operate in?
            </label>
            <input
              type="text"
              id="city"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., Manchester"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>
        );
      case 'country':
        return (
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
              Which country will you operate in?
            </label>
            <input
              type="text"
              id="country"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., United Kingdom"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            />
          </div>
        );
      case 'both':
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                Which city will be your primary location?
              </label>
              <input
                type="text"
                id="city"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Manchester"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                Which country will you expand to?
              </label>
              <input
                type="text"
                id="country"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., United Kingdom"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Competition Analysis</h2>
            <button 
              onClick={() => navigate('/market-analysis')}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back to Market Analysis
            </button>
          </div>
          
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
              <label htmlFor="scope" className="block text-sm font-medium text-gray-700 mb-2">
                What is your target business scope?
              </label>
              <select
                id="scope"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                value={formData.scope}
                onChange={(e) => setFormData({ ...formData, scope: e.target.value as 'city' | 'country' | 'both', city: '', country: '' })}
              >
                <option value="">Select business scope</option>
                <option value="city">City-based - Focus on local market</option>
                <option value="country">Country-based - National presence</option>
                <option value="both">Both - Combined local and national focus</option>
              </select>
            </div>

            {renderLocationFields()}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !isFormValid()}
              className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium ${
                isLoading || !isFormValid()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 transform hover:scale-105 transition-all duration-200'
              }`}
            >
              {isLoading ? (
                'Analyzing Competition...'
              ) : (
                <>
                  Get Competition Analysis
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </form>

          {aiResponse && (
            <div className="mt-8 space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900">Competition Analysis Results</h3>
              
              {aiResponse.competitorOverview && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Competitive Landscape Overview</h4>
                  <p className="text-gray-600">{aiResponse.competitorOverview}</p>
                </div>
              )}

              {aiResponse.directCompetitors && aiResponse.directCompetitors.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Direct Competitors</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {aiResponse.directCompetitors.map((competitor, index) => (
                      <li key={index} className="text-gray-600">{competitor}</li>
                    ))}
                  </ul>
                </div>
              )}

              {aiResponse.indirectCompetitors && aiResponse.indirectCompetitors.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Indirect Competitors</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {aiResponse.indirectCompetitors.map((competitor, index) => (
                      <li key={index} className="text-gray-600">{competitor}</li>
                    ))}
                  </ul>
                </div>
              )}

              {aiResponse.competitiveAdvantages && aiResponse.competitiveAdvantages.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Potential Competitive Advantages</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {aiResponse.competitiveAdvantages.map((advantage, index) => (
                      <li key={index} className="text-gray-600">{advantage}</li>
                    ))}
                  </ul>
                </div>
              )}

              {aiResponse.marketGaps && aiResponse.marketGaps.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Market Gaps & Opportunities</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {aiResponse.marketGaps.map((gap, index) => (
                      <li key={index} className="text-gray-600">{gap}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default CompetitionAnalysis;
