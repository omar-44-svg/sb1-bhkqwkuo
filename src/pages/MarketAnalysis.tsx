import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, BarChart, Users, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

import CurrentStateAnalysis from './market-analysis/CurrentStateAnalysis';
import CompetitionAnalysis from './market-analysis/CompetitionAnalysis';
import TargetMarketAnalysis from './market-analysis/TargetMarketAnalysis';

interface MarketAnalysisForm {
  industry: string;
  targetMarket: string;
  operationType: 'online' | 'physical' | '';
  scope: 'city' | 'country' | 'both' | '';
  city?: string;
  country?: string;
}

interface AIResponse {
  currentState?: any;
  competition?: any;
  targetMarket?: any;
}

function MarketAnalysis() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<MarketAnalysisForm>({
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
  const [activeTab, setActiveTab] = useState<'current' | 'competition' | 'target' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setAiResponse(null);

    try {
      const [currentStateRes, competitionRes, targetMarketRes] = await Promise.all([
        fetch('https://omar44.app.n8n.cloud/webhook/current-state-of-industry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }),
        fetch('https://omar44.app.n8n.cloud/webhook/competition-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }),
        fetch('https://omar44.app.n8n.cloud/webhook/target-market-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
      ]);

      const [currentStateData, competitionData, targetMarketData] = await Promise.all([
        currentStateRes.json(),
        competitionRes.json(),
        targetMarketRes.json()
      ]);

      setAiResponse({
        currentState: currentStateData,
        competition: competitionData,
        targetMarket: targetMarketData
      });

      setActiveTab('current');
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Which city will you operate in?</label>
            <input type="text" className="w-full px-4 py-3 rounded-lg border" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
          </div>
        );
      case 'country':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Which country will you operate in?</label>
            <input type="text" className="w-full px-4 py-3 rounded-lg border" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
          </div>
        );
      case 'both':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Which city will be your primary location?</label>
              <input type="text" className="w-full px-4 py-3 rounded-lg border" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Which country will you expand to?</label>
              <input type="text" className="w-full px-4 py-3 rounded-lg border" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderResults = () => {
    if (!aiResponse || !activeTab) return null;

    const section = {
      current: aiResponse.currentState,
      competition: aiResponse.competition,
      target: aiResponse.targetMarket
    }[activeTab];

    return (
      <div className="mt-6 prose max-w-none">
        {section?.content ? (
          <ReactMarkdown>{section.content}</ReactMarkdown>
        ) : (
          <p>No analysis found.</p>
        )}
      </div>
    );
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Market Analysis</h2>
            <button onClick={() => navigate('/')} className="text-gray-600 hover:text-gray-800">← Back to Home</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">What industry are you interested in?</label>
              <input type="text" className="w-full px-4 py-3 rounded-lg border" value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Who is your target market?</label>
              <textarea className="w-full h-32 px-4 py-3 rounded-lg border resize-none" value={formData.targetMarket} onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">How do you plan to operate your business?</label>
              <select className="w-full px-4 py-3 rounded-lg border" value={formData.operationType} onChange={(e) => setFormData({ ...formData, operationType: e.target.value as 'online' | 'physical' })}>
                <option value="">Select operation type</option>
                <option value="online">Online</option>
                <option value="physical">Physical Location</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">What is your target business scope?</label>
              <select className="w-full px-4 py-3 rounded-lg border" value={formData.scope} onChange={(e) => setFormData({ ...formData, scope: e.target.value as any, city: '', country: '' })}>
                <option value="">Select business scope</option>
                <option value="city">City</option>
                <option value="country">Country</option>
                <option value="both">Both</option>
              </select>
            </div>

            {renderLocationFields()}

            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

            <button type="submit" disabled={isLoading || !isFormValid()} className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium ${isLoading || !isFormValid() ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}>
              {isLoading ? 'Analyzing Market...' : <>Get Market Analysis <Send className="w-4 h-4 ml-2" /></>}
            </button>
          </form>

          {/* Tabs and Result display */}
          {aiResponse && (
            <>
              <div className="mt-10 border-b border-gray-200">
                <div className="flex space-x-4">
                  <button onClick={() => setActiveTab('current')} className={`py-2 px-4 border-b-2 ${activeTab === 'current' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                    <div className="flex items-center space-x-2">
                      <BarChart className="w-5 h-5" />
                      <span>Current State</span>
                    </div>
                  </button>
                  <button onClick={() => setActiveTab('competition')} className={`py-2 px-4 border-b-2 ${activeTab === 'competition' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                    <div className="flex items-center space-x-2">
                      <Target className="w-5 h-5" />
                      <span>Competition</span>
                    </div>
                  </button>
                  <button onClick={() => setActiveTab('target')} className={`py-2 px-4 border-b-2 ${activeTab === 'target' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>Target Market</span>
                    </div>
                  </button>
                </div>
              </div>
              {renderResults()}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default MarketAnalysis;
