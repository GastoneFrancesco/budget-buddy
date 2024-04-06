import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { HomePageComponent } from './components/HomePageComponent';
import { FooterComponent } from './components/FooterComponent';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="home-page" />} />
          <Route path="/home-page" element={<HomePageComponent />} />
        </Routes>
      </Router>

      <FooterComponent />
    </>

  );
}

export default App;
