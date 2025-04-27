import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';

function FinancialPlanningResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const aiResponse = location.state?.aiResponse;

  if (!aiResponse) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h2 className="text-2xl font-semibold mb-4">No Financial Data Found</h2>
        <button
          onClick={() => navigate('/financial-planning')}
          className="text-green-600 hover:underline"
        >
          ← Go Back to Planning Form
        </button>
      </div>
    );
  }

  const { idealPlanMarkdown, tailoredPlanMarkdown } = aiResponse;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Your Financial Planning Results</h1>
          <button
            onClick={() => navigate('/financial-planning')}
            className="text-gray-600 hover:text-gray-800 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-green-600">Ideal Financial Plan</h2>
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>{idealPlanMarkdown}</ReactMarkdown>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-green-600">Tailored Financial Plan</h2>
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>{tailoredPlanMarkdown}</ReactMarkdown>
          </div>
        </section>
      </div>
    </main>
  );
}

export default FinancialPlanningResults;
