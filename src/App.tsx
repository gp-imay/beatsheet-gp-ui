import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { BeatSheetPage } from './pages/BeatSheetPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/beat-sheet" element={<BeatSheetPage />} />
      </Routes>
    </Router>
  );
}

export default App;