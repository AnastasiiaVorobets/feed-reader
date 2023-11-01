import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import FeedListPage from './pages/FeedListPage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/feeds" element={<FeedListPage />} />
        <Route path="/feeds/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
