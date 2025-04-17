import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Brain } from 'lucide-react';
import HomePage from './pages/HomePage';
import BusinessEssentials from './pages/BusinessEssentials';
import BusinessEssentialsResult from './pages/BusinessEssentialsResult'; // ✅ Add this
import BusinessPhaseHelp from './pages/BusinessPhaseHelp'; // ✅ Add this
import QAPage from './pages/QAPage';
import TrendsPage from './pages/TrendsPage';
import SkillsPage from './pages/SkillsPage';
import MarketAnalysis from './pages/MarketAnalysis';
import FinancialPlanning from './pages/FinancialPlanning';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <Brain className="h-8 w-8 text-green-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">Help Ridge</span>
                </Link>
                <div className="hidden md:flex ml-10 space-x-4">
                  <Link to="/business-essentials" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Business Essentials</Link>
                  <Link to="/market-analysis" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Market Analysis</Link>
                  <Link to="/financial-planning" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Financial Planning</Link>
                  <Link to="/qa" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Q&A</Link>
                  <Link to="/trends" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Trends</Link>
                  <Link to="/skills" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Skills</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/business-essentials" element={<BusinessEssentials />} />
          <Route path="/business-essentials/result" element={<BusinessEssentialsResult />} /> {/* ✅ Result Page */}
          <Route path="/business-essentials/help" element={<BusinessPhaseHelp />} /> {/* ✅ Help Page */}
          <Route path="/market-analysis" element={<MarketAnalysis />} />
          <Route path="/financial-planning" element={<FinancialPlanning />} />
          <Route path="/qa" element={<QAPage />} />
          <Route path="/trends" element={<TrendsPage />} />
          <Route path="/skills" element={<SkillsPage />} />
        </Routes>

        <footer className="bg-gray-50 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-gray-500">
              © {new Date().getFullYear()} Help Ridge. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
