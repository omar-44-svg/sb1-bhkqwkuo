import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function BusinessPhaseHelp() {
  const location = useLocation();
  const navigate = useNavigate();

  const { phaseTitle, phaseContent } = location.state || {};
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');

  const handleSubmit = async () => {
    if (!question || !phaseTitle || !phaseContent) return;

    setLoading(true);

    try {
      const response = await fetch('https://omar44.app.n8n.cloud/webhook/business-phase-help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phaseTitle,
          phaseContent,
          question
        }),
      });

      const data = await response.json();

      // Log the full response to check the structure
      console.log('Full AI Response:', data);

      // Adjust the response to check for message.content
      if (data && data.message && data.message.content) {
        setAnswer(data.message.content); // Use the content from the message
      } else {
        setAnswer('Sorry, no answer was returned. Please check the response format.');
      }
    } catch (err) {
      console.error('Error during fetch:', err);
      setAnswer('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!phaseTitle || !phaseContent) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">No Phase Selected</h2>
        <p className="mt-4 text-gray-600">Please go back to your results and pick a phase to ask about.</p>
        <button
          onClick={() => navigate('/business-essentials/result')}
          className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Back to Results
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{phaseTitle}</h2>

        <label htmlFor="userQuestion" className="block text-gray-700 font-medium mb-2">
          What do you need help with?
        </label>
        <textarea
          id="userQuestion"
          className="w-full h-32 p-4 border border-gray-300 rounded-lg mb-4"
          placeholder="Describe your issue with this phase..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Get Help'}
        </button>

        {answer && (
          <div className="mt-6 bg-gray-50 border border-gray-200 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">AI Response:</h3>
            <p className="text-gray-600 whitespace-pre-line">{answer}</p>
          </div>
        )}

        <button
          onClick={() => navigate('/business-essentials/result')}
          className="mt-8 block px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          ← Back to Results
        </button>
      </div>
    </main>
  );
}

export default BusinessPhaseHelp;
