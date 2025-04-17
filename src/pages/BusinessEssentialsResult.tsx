import { useLocation, useNavigate, Link } from 'react-router-dom';

function BusinessEssentialsResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const aiResponse = location.state?.aiResponse;

  const cleanText = (text: string) => text.replace(/<br\s*\/?>/gi, '\n');

  const handleHelpClick = (phaseTitle: string, phaseContent: string) => {
    navigate('/business-essentials/help', {
      state: {
        phaseTitle,
        phaseContent,
      },
    });
  };

  const extractPhases = (text: string) => {
    const regex = /(📍 Phase \d+:.*?)(?=📍 Phase \d+:|$)/gs;
    const matches = [...text.matchAll(regex)];
    return matches.map(match => {
      const full = match[1].trim();
      const titleMatch = full.match(/(📍 Phase \d+:.*?)(\n|$)/);
      const title = titleMatch ? titleMatch[1] : 'Unknown Phase';
      const content = full.replace(title, '').trim();
      return { title, content };
    });
  };

  const phases = aiResponse?.businessPlan ? extractPhases(cleanText(aiResponse.businessPlan)) : [];

  if (!aiResponse) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">No Business Plan Found</h2>
        <p className="mt-4 text-gray-600">Please go back and submit your business details first.</p>
        <button
          onClick={() => navigate('/business-essentials')}
          className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Back to Form
        </button>
      </main>
    );
  }

  return (
    <>
      {/* Top Navigation */}
      <nav className="w-full bg-white shadow-sm py-3 px-6 flex justify-between items-center">
        <div className="text-xl font-bold text-green-700">Help Ridge</div>
        <div className="space-x-4 text-sm sm:text-base">
          <Link to="/" className="text-gray-700 hover:text-green-600 font-medium">
            Home
          </Link>
          <Link to="/market-analysis" className="text-gray-700 hover:text-green-600">
            Market Analysis
          </Link>
          <Link to="/financial-planning" className="text-gray-700 hover:text-green-600">
            Financial Planning
          </Link>
          <Link to="/business-qa" className="text-gray-700 hover:text-green-600">
            Business Q&A
          </Link>
          <Link to="/side-hustles" className="text-gray-700 hover:text-green-600">
            Trending Side Hustles
          </Link>
          <Link to="/skills" className="text-gray-700 hover:text-green-600">
            Skill-Based Matching
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Your Personalized Business Plan
          </h2>

          {phases.map((phase, index) => (
            <div key={index} className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-700">{phase.title}</h3>
                <button
                  onClick={() => handleHelpClick(phase.title, phase.content)}
                  className="text-sm text-blue-600 underline"
                >
                  Need help with this phase?
                </button>
              </div>
              <p className="text-gray-600 whitespace-pre-line">{phase.content}</p>
            </div>
          ))}

          <button
            onClick={() => navigate('/business-essentials')}
            className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            ← Back to Form
          </button>
        </div>
      </main>
    </>
  );
}

export default BusinessEssentialsResult;
