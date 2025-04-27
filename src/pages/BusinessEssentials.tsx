import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';

interface BusinessForm {
  idea: string;
  budget: string;
  location: string;
  experience: 'beginner' | 'intermediate' | 'expert';
}

function BusinessEssentials() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BusinessForm>({
    idea: '',
    budget: '',
    location: '',
    experience: 'beginner',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const n8nResponse = await fetch('https://omar44.app.n8n.cloud/webhook/business-roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!n8nResponse.ok) {
        throw new Error(`Failed to submit data: ${n8nResponse.statusText}`);
      }

      const aiOutput = await n8nResponse.json();

      const normalizedOutput = {
        businessPlan: aiOutput.BusinessPlan || aiOutput.businessPlan,
        marketAnalysis: aiOutput.MarketAnalysis || aiOutput.marketAnalysis,
        financialAdvice: aiOutput.FinancialAdvice || aiOutput.financialAdvice,
        nextSteps: aiOutput.NextSteps || aiOutput.nextSteps,
      };

      const supabaseResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-output`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input: formData,
            output: normalizedOutput,
          }),
        }
      );

      if (!supabaseResponse.ok) {
        console.warn('Failed to store AI output');
      }

      navigate('/business-essentials/result', { state: { aiResponse: normalizedOutput } });
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    formData.idea.trim() !== '' &&
    formData.budget.trim() !== '' &&
    formData.location.trim() !== '';

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6">Business Essentials</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="idea" className="block text-sm font-medium text-gray-700 mb-2">
                What's your business idea?
              </label>
              <textarea
                id="idea"
                className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300"
                placeholder="Share your idea..."
                value={formData.idea}
                onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
              ></textarea>
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                What's your initial budget?
              </label>
              <input
                type="text"
                id="budget"
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                placeholder="e.g., £5,000"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Where do you plan to operate?
              </label>
              <input
                type="text"
                id="location"
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                placeholder="e.g., London"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                Business Experience Level
              </label>
              <select
                id="experience"
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value as BusinessForm['experience'] })
                }
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            {error && <div className="text-red-600">{error}</div>}

            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="w-full px-6 py-3 rounded-lg text-white font-medium bg-green-600 hover:bg-green-700 flex items-center justify-center"
            >
              {isLoading ? (
                'Creating Your Plan...'
              ) : (
                <>
                  <span>Get Your Personalised Business Plan</span>
                  <Send className="ml-2 w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default BusinessEssentials;
