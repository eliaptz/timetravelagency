import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quizQuestions = [
  {
    id: 1,
    question: 'Quel type d\'expérience recherchez-vous ?',
    options: [
      { text: 'Culture et raffinement', scores: { paris: 3, florence: 2, cretace: 0 } },
      { text: 'Aventure et sensations fortes', scores: { paris: 0, florence: 1, cretace: 3 } },
      { text: 'Art et créativité', scores: { paris: 2, florence: 3, cretace: 0 } },
      { text: 'Nature et découverte', scores: { paris: 1, florence: 0, cretace: 3 } }
    ]
  },
  {
    id: 2,
    question: 'Quelle ambiance vous attire le plus ?',
    options: [
      { text: 'Élégance et fêtes mondaines', scores: { paris: 3, florence: 1, cretace: 0 } },
      { text: 'Ateliers d\'artistes et créativité', scores: { paris: 1, florence: 3, cretace: 0 } },
      { text: 'Nature sauvage et préhistorique', scores: { paris: 0, florence: 0, cretace: 3 } },
      { text: 'Architecture et monuments', scores: { paris: 2, florence: 2, cretace: 0 } }
    ]
  },
  {
    id: 3,
    question: 'Qu\'aimeriez-vous ramener comme souvenir ?',
    options: [
      { text: 'Un croquis de la Tour Eiffel en construction', scores: { paris: 3, florence: 0, cretace: 0 } },
      { text: 'Un dessin signé par un maître de la Renaissance', scores: { paris: 0, florence: 3, cretace: 0 } },
      { text: 'Une photo (certifiée) d\'un dinosaure', scores: { paris: 0, florence: 0, cretace: 3 } },
      { text: 'Des histoires extraordinaires', scores: { paris: 1, florence: 1, cretace: 1 } }
    ]
  },
  {
    id: 4,
    question: 'Quel niveau d\'aventure préférez-vous ?',
    options: [
      { text: 'Confortable et luxueux', scores: { paris: 3, florence: 2, cretace: 0 } },
      { text: 'Modéré avec quelques challenges', scores: { paris: 2, florence: 3, cretace: 1 } },
      { text: 'Intense et extrême', scores: { paris: 0, florence: 0, cretace: 3 } },
      { text: 'Équilibré entre confort et découverte', scores: { paris: 2, florence: 2, cretace: 2 } }
    ]
  }
];

const destinations = {
  paris: {
    name: 'Paris 1889',
    subtitle: 'La Belle Époque',
    description: 'Votre profil correspond parfaitement à l\'élégance et au raffinement de Paris à la Belle Époque !',
    emoji: '🗼',
    color: 'from-rose-500 to-pink-600'
  },
  florence: {
    name: 'Florence 1504',
    subtitle: 'La Renaissance',
    description: 'Votre âme d\'artiste vous appelle vers Florence, berceau de la Renaissance !',
    emoji: '🎨',
    color: 'from-amber-500 to-orange-600'
  },
  cretace: {
    name: 'Crétacé -65M',
    subtitle: 'L\'Ère des Dinosaures',
    description: 'Votre esprit aventurier vous guide vers le Crétacé et ses créatures extraordinaires !',
    emoji: '🦖',
    color: 'from-green-500 to-emerald-600'
  }
};

const Quiz = ({ onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ paris: 0, florence: 0, cretace: 0 });
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAnswer = (option) => {
    setSelectedOption(option);
    
    // Attend un peu pour l'animation
    setTimeout(() => {
      // Met à jour les scores
      const newScores = {
        paris: scores.paris + option.scores.paris,
        florence: scores.florence + option.scores.florence,
        cretace: scores.cretace + option.scores.cretace
      };
      setScores(newScores);

      // Passe à la question suivante ou affiche le résultat
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 600);
  };

  const getRecommendation = () => {
    const maxScore = Math.max(scores.paris, scores.florence, scores.cretace);
    if (scores.paris === maxScore) return destinations.paris;
    if (scores.florence === maxScore) return destinations.florence;
    return destinations.cretace;
  };

  const scrollToDestinations = () => {
    onClose();
    setTimeout(() => {
      document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full border border-amber-500/30 shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {!showResult ? (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">
                  Question {currentQuestion + 1} sur {quizQuestions.length}
                </span>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-amber-500 to-yellow-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
                  {quizQuestions[currentQuestion].question}
                </h3>

                {/* Options */}
                <div className="space-y-4">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        selectedOption === option
                          ? 'border-amber-500 bg-amber-500/20'
                          : 'border-gray-700 hover:border-amber-500/50 bg-gray-800 hover:bg-gray-700'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={selectedOption !== null}
                    >
                      <span className="text-lg">{option.text}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          // Résultat
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="text-6xl mb-4">{getRecommendation().emoji}</div>
            <h3 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${getRecommendation().color} bg-clip-text text-transparent`}>
              {getRecommendation().name}
            </h3>
            <p className="text-xl text-gray-400 mb-6">{getRecommendation().subtitle}</p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {getRecommendation().description}
            </p>

            {/* Scores Display */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {Object.entries(scores).map(([key, score]) => (
                <div key={key} className="bg-gray-800 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">
                    {destinations[key].emoji}
                  </div>
                  <div className="text-2xl font-bold text-amber-400">{score}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <motion.button
                onClick={scrollToDestinations}
                className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-600 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Voir les destinations
              </motion.button>
              <motion.button
                onClick={onClose}
                className="flex-1 border-2 border-gray-700 py-3 rounded-lg font-semibold hover:border-amber-500 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Fermer
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Quiz;
