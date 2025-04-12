import React, { useState } from 'react';
import { Brain, Building2, Rocket, Send, BookOpen, Target, DollarSign } from 'lucide-react';

interface BusinessForm {
  idea: string;
  budget: string;
  location: string;
  experience: 'beginner' | 'intermediate' | 'expert';
}

function App() {
  const [formData, setFormData] = useState<BusinessForm>({
    idea: '',
    budget: '',
    location: '',
    experience: 'beginner'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send form data to your n8n webhook
      const response = await fetch('https://omar44.app.n8n.cloud/webhook/business-roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      // Optionally, handle response here (e.g., show success message)

    } catch (error) {
      console.error('Error submitting form:', error);
      // Optionally, handle error state here
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.idea.trim() && formData.budget.trim() && formData.location.trim();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Business Starter AI</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Launch Your Business with Confidence
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Not sure where to start? We'll guide you through every step of launching your business, from initial planning to execution, using AI-powered insights tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 transform hover:scale-105 transition-transform duration-200">
            <BookOpen className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Business Essentials</h3>
            <p className="text-gray-600">Navigate business registration, choose the right business structure, and understand local requirements</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 transform hover:scale-105 transition-transform duration-200">
            <Target className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Market Analysis</h3>
            <p className="text-gray-600">Get insights into your target market, understand consumer behaviour, and identify opportunities</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 transform hover:scale-105 transition-transform duration-200">
            <DollarSign className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Financial Planning</h3>
            <p className="text-gray-600">Understand tax implications, explore funding options, and create a solid financial foundation</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold mb-2">Start Your Business Journey</h2>
            <p className="text-gray-600 mb-8">Whether you're planning a local café or an innovative tech startup, we'll help you turn your vision into reality.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="idea" className="block text-sm font-medium text-gray-700 mb-2">
                  What's your business idea?
                </label>
                <p className="text-sm text-gray-500 mb-2">Share your vision - from a neighbourhood coffee shop to an online marketplace.</p>
                <textarea
                  id="idea"
                  className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Share your idea, no matter how early stage... (e.g., 'I want to open a coffee shop that also serves as a community workspace')"
                  value={formData.idea}
                  onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                ></textarea>
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                  What's your initial budget?
                </label>
                <p className="text-sm text-gray-500 mb-2">We'll help you explore funding options and create a financial plan that works for you.</p>
                <input
                  type="text"
                  id="budget"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your starting budget (e.g., £5,000)"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Where do you plan to operate?
                </label>
                <p className="text-sm text-gray-500 mb-2">We'll research local requirements and market opportunities in your area.</p>
                <input
                  type="text"
                  id="location"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="City (e.g., Manchester)"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Experience Level
                </label>
                <p className="text-sm text-gray-500 mb-2">We'll tailor our guidance based on your experience.</p>
                <select
                  id="experience"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value as BusinessForm['experience'] })}
                >
                  <option value="beginner">Beginner - This is my first business venture</option>
                  <option value="intermediate">Intermediate - I've worked in or managed businesses before</option>
                  <option value="expert">Expert - I've owned businesses before</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading || !isFormValid}
                className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium ${
                  isLoading || !isFormValid
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-200'
                }`}
              >
                {isLoading ? (
                  'Creating Your Plan...'
                ) : (
                  <>
                    Get Your Personalised Business Plan
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} Business Starter AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
