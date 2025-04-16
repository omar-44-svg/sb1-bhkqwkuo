import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Target, DollarSign, HelpCircle, TrendingUp as Trending, Briefcase } from 'lucide-react';

function HomePage() {
  const navigate = useNavigate();

  return (
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
        <div 
          className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 transform hover:scale-105 transition-transform duration-200 cursor-pointer"
          onClick={() => navigate('/business-essentials')}
        >
          <BookOpen className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Business Essentials</h3>
          <p className="text-gray-600">Navigate business registration, choose the right business structure, and understand local requirements</p>
          <button className="mt-4 text-green-600 hover:text-green-700 font-medium">
            Get Started →
          </button>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 transform hover:scale-105 transition-transform duration-200">
          <Target className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Market Analysis</h3>
          <p className="text-gray-600">Get insights into your target market, understand consumer behaviour, and identify opportunities</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 transform hover:scale-105 transition-transform duration-200">
          <DollarSign className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Financial Planning</h3>
          <p className="text-gray-600">Understand tax implications, explore funding options, and create a solid financial foundation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 transform hover:scale-105 transition-transform duration-200">
          <HelpCircle className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Business Q&A</h3>
          <p className="text-gray-600 mb-4">Get expert answers to your specific business questions and concerns</p>
          <button 
            onClick={() => navigate('/qa')}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Ask a Question →
          </button>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 transform hover:scale-105 transition-transform duration-200">
          <Trending className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Trending Side Hustles</h3>
          <p className="text-gray-600 mb-4">Discover popular and profitable side business opportunities</p>
          <button 
            onClick={() => navigate('/trends')}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Explore Trends →
          </button>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 transform hover:scale-105 transition-transform duration-200">
          <Briefcase className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Skill-Based Matching</h3>
          <p className="text-gray-600 mb-4">Find the perfect business opportunity based on your skills and interests</p>
          <button 
            onClick={() => navigate('/skills')}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Match My Skills →
          </button>
        </div>
      </div>
    </main>
  );
}

export default HomePage;