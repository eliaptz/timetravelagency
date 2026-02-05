import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Quiz from './components/Quiz';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="App bg-gray-900 text-white">
      <Header />
      <Hero />
      <Destinations onQuizOpen={() => setShowQuiz(true)} />
      {showQuiz && <Quiz onClose={() => setShowQuiz(false)} />}
      <ChatBot />
      <Footer />
    </div>
  );
}

export default App;
