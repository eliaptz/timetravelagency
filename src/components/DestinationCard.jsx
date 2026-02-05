import React from 'react';
import { motion } from 'framer-motion';

const DestinationCard = ({ destination, index, onBook }) => {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-amber-500/20 transition-all duration-500">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          {/* Placeholder gradient background - remplacez avec vos images */}
          <div className={`absolute inset-0 bg-gradient-to-br ${destination.color} opacity-60`} />
          <motion.img
            src={destination.image}
            alt={destination.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            onError={(e) => {
              // Si l'image n'existe pas, affiche un gradient
              e.target.style.display = 'none';
            }}
          />
          
          {/* Period Badge */}
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
            {destination.period}
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
            {destination.title}
          </h3>
          <p className="text-lg text-gray-400 mb-4">{destination.subtitle}</p>
          <p className="text-gray-300 mb-6 leading-relaxed">
            {destination.description}
          </p>

          {/* Highlights */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-amber-400 mb-3">Points forts :</h4>
            <ul className="space-y-2">
              {destination.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start text-sm text-gray-300">
                  <span className="text-amber-400 mr-2">✓</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* Price & Duration */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-700">
            <div>
              <p className="text-sm text-gray-400">À partir de</p>
              <p className="text-2xl font-bold text-amber-400">{destination.price}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Durée</p>
              <p className="text-lg font-semibold">{destination.duration}</p>
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={onBook}
            className={`w-full bg-gradient-to-r ${destination.color} py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Réserver maintenant
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
