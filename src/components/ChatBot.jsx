import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Bonjour ! Je suis votre assistant virtuel TimeTravel Agency. 🕰️ Comment puis-je vous aider à planifier votre voyage temporel ?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fonction pour appeler l'API Mistral
  const sendMessageToAI = async (userMessage) => {
    try {
      const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
      
      if (!apiKey) {
        throw new Error('API key not configured');
      }

      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'mistral-small-latest',
          messages: [
            {
              role: 'system',
              content: `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe. 
              
Personnalité :
- Professionnel mais chaleureux et passionné d'histoire
- Expert en voyage temporel (fictif mais crédible)
- Enthousiaste et inspirant

Destinations disponibles :
1. Paris 1889 (Belle Époque) - 2,499€ - 7 jours
   - Inauguration Tour Eiffel, Moulin Rouge, Exposition Universelle
2. Crétacé -65M (Dinosaures) - 4,999€ - 5 jours
   - Observation T-Rex, forêts préhistoriques, sécurité max
3. Florence 1504 (Renaissance) - 3,499€ - 6 jours
   - Michel-Ange, Léonard de Vinci, Palais Médicis

Tous les voyages incluent : guide temporel certifié, équipement chrono, assurance, traducteur universel.

Réponds de manière concise (3-4 phrases max), avec des émojis pertinents, et encourage la réservation.`
            },
            ...messages.slice(-6), // Garde les 6 derniers messages pour le contexte
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 300
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling Mistral AI:', error);
      // Fallback responses si l'API échoue
      return getFallbackResponse(userMessage);
    }
  };

  // Réponses de secours si l'API n'est pas configurée
  const getFallbackResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('prix') || lowerMessage.includes('coût') || lowerMessage.includes('tarif')) {
      return 'Nos tarifs varient selon la destination : Paris 1889 à 2,499€, Florence 1504 à 3,499€, et Crétacé à 4,999€. Tous incluent guide, équipement et assurance ! 💎';
    }
    if (lowerMessage.includes('paris') || lowerMessage.includes('1889')) {
      return 'Paris 1889, c\'est l\'apogée de la Belle Époque ! Assistez à l\'inauguration de la Tour Eiffel, vivez l\'ambiance des cabarets... Un voyage de 7 jours à 2,499€. Intéressé(e) ? 🗼✨';
    }
    if (lowerMessage.includes('dinosaure') || lowerMessage.includes('crétacé')) {
      return 'Le Crétacé, c\'est l\'aventure ultime ! Observez les T-Rex en toute sécurité. 5 jours inoubliables à 4,999€. Notre protocole de sécurité est infaillible ! 🦖🌿';
    }
    if (lowerMessage.includes('florence') || lowerMessage.includes('renaissance')) {
      return 'Florence 1504, au cœur de la Renaissance ! Rencontrez Michel-Ange et Léonard de Vinci. 6 jours d\'art et de culture à 3,499€. Un voyage qui change une vie ! 🎨🏛️';
    }
    if (lowerMessage.includes('sécurité') || lowerMessage.includes('danger')) {
      return 'Votre sécurité est notre priorité absolue ! Équipement chrono certifié, guides experts, assurance complète et garantie de retour. Nous avons 100% de succès ! ✅🛡️';
    }
    
    return 'Je serais ravi de vous aider à choisir votre destination ! Nos voyages vers Paris 1889, le Crétacé ou Florence 1504 sont tous exceptionnels. Quelle époque vous attire le plus ? 🕰️✨';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Ajoute le message utilisateur
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Obtient la réponse de l'IA
    const aiResponse = await sendMessageToAI(userMessage);
    
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-amber-500 to-yellow-600 p-4 rounded-full shadow-2xl hover:shadow-amber-500/50 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-gray-900 rounded-2xl shadow-2xl border border-amber-500/30 flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  🕰️
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">TimeTravel Assistant</h3>
                  <p className="text-xs text-gray-800">En ligne</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-gray-900'
                        : 'bg-gray-700 text-white'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-gray-700 p-3 rounded-2xl">
                    <div className="flex gap-2">
                      <motion.div
                        className="w-2 h-2 bg-amber-400 rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-amber-400 rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-amber-400 rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-gray-900 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Posez-moi vos questions sur les voyages temporels..."
                  className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-gray-500"
                  disabled={isLoading}
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-gradient-to-r from-amber-500 to-yellow-600 p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
