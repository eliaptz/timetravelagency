import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BookingModal = ({ destination, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: 1,
    date: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici vous pouvez ajouter l'envoi vers un backend
    console.log('Réservation:', { destination: destination.title, ...formData });
    setSubmitted(true);
    
    // Ferme après 3 secondes
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
        className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full border border-amber-500/30 shadow-2xl max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {!submitted ? (
          <>
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className={`text-3xl font-bold mb-2 bg-gradient-to-r ${destination.color} bg-clip-text text-transparent`}>
                  Réserver {destination.title}
                </h3>
                <p className="text-gray-400">{destination.subtitle}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Destination Summary */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-400">Prix par personne</span>
                <span className="text-2xl font-bold text-amber-400">{destination.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Durée du voyage</span>
                <span className="font-semibold">{destination.duration}</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    placeholder="Jean Dupont"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    placeholder="jean.dupont@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Nombre de voyageurs *
                  </label>
                  <select
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num > 1 ? 'personnes' : 'personne'}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Date de départ souhaitée *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Message (optionnel)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none"
                    placeholder="Avez-vous des demandes particulières ?"
                  />
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Prix total estimé</span>
                  <span className="text-2xl font-bold text-amber-400">
                    {(parseFloat(destination.price.replace(/[^0-9]/g, '')) * formData.travelers).toLocaleString()}€
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  * Prix indicatif, le devis final vous sera envoyé par email
                </p>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className={`w-full bg-gradient-to-r ${destination.color} py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Envoyer la demande de réservation
              </motion.button>

              <p className="text-xs text-gray-400 text-center">
                En soumettant ce formulaire, vous acceptez d'être contacté par TimeTravel Agency
              </p>
            </form>
          </>
        ) : (
          // Success Message
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
            >
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>

            <h3 className="text-3xl font-bold mb-4 text-green-400">
              Demande envoyée avec succès !
            </h3>
            <p className="text-xl text-gray-300 mb-2">
              Merci {formData.name} pour votre intérêt
            </p>
            <p className="text-gray-400">
              Notre équipe va étudier votre demande et vous contactera dans les 24h à l'adresse {formData.email}
            </p>

            <motion.div
              className="mt-8 text-amber-400"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Fermeture automatique...
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BookingModal;
