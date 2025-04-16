import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Brain } from 'lucide-react';
import HomePage from './pages/HomePage';
import BusinessEssentials from './pages/BusinessEssentials';
import BusinessEssentialsResult from './pages/BusinessEssentialsResult';
import BusinessPhaseHelp from './pages/BusinessPhaseHelp'; // ✅ NEW IMPORT
import QAPage from './pages/QAPage';
import TrendsPage from './pages/TrendsPage';
import SkillsPage from './pages/SkillsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-green-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Help Ridge</span>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/business-essentials" element={<BusinessEssentials />} />
          <Route path="/business-essentials/result" element={<BusinessEssentialsResult />} />
          <Route path="/business-essentials/help" element={<BusinessPhaseHelp />} /> {/* ✅ NEW ROUTE */}
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
