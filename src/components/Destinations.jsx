import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DestinationCard from './DestinationCard';
import BookingModal from './BookingModal';

const destinationsData = [
  {
    id: 1,
    title: 'Paris 1889',
    subtitle: 'La Belle Époque',
    period: 'Fin du XIXe siècle',
    description: 'Assistez à l\'inauguration de la Tour Eiffel, promenez-vous dans les cabarets du Moulin Rouge, et découvrez Paris à son apogée culturelle et artistique.',
    highlights: [
      'Inauguration de la Tour Eiffel',
      'Cabarets et Moulin Rouge',
      'Exposition Universelle',
      'Rencontre avec les Impressionnistes'
    ],
    price: '2,499€',
    duration: '7 jours',
    image: '/images/paris-1889.png', // Placeholder - vous remplacerez
    color: 'from-rose-500 to-pink-600'
  },
  {
    id: 2,
    title: 'Crétacé -65M',
    subtitle: 'L\'Ère des Dinosaures',
    period: 'Il y a 65 millions d\'années',
    description: 'Explorez la Terre préhistorique et observez les dinosaures dans leur habitat naturel. Une expérience unique avec les plus grandes créatures ayant jamais foulé notre planète.',
    highlights: [
      'Observation des T-Rex',
      'Rencontre avec les Tricératops',
      'Forêts préhistoriques',
      'Sécurité maximale garantie'
    ],
    price: '4,999€',
    duration: '5 jours',
    image: '/images/cretace.png', // Placeholder - vous remplacerez
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 3,
    title: 'Florence 1504',
    subtitle: 'La Renaissance Italienne',
    period: 'Début du XVIe siècle',
    description: 'Rencontrez Michel-Ange et Léonard de Vinci, admirez la naissance de chefs-d\'œuvre, et plongez au cœur de la Renaissance italienne, berceau de l\'art moderne.',
    highlights: [
      'Rencontre avec Michel-Ange',
      'Ateliers de Léonard de Vinci',
      'Palais des Médicis',
      'Naissance du David'
    ],
    price: '3,499€',
    duration: '6 jours',
    image: '/images/florence-1504.png', // Placeholder - vous remplacerez
    color: 'from-amber-500 to-orange-600'
  }
];

const Destinations = ({ onQuizOpen }) => {
  const [selectedDestination, setSelectedDestination] = useState(null);

  return (
    <section id="destinations" className="py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
            Nos Destinations Temporelles
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choisissez votre époque et vivez une aventure inoubliable à travers l'Histoire
          </p>

          {/* Quiz CTA */}
          <motion.button
            onClick={onQuizOpen}
            className="mt-8 border-2 border-amber-400 px-6 py-3 rounded-full text-amber-400 font-semibold hover:bg-amber-400 hover:text-gray-900 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🎯 Quelle destination vous correspond ?
          </motion.button>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinationsData.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              index={index}
              onBook={() => setSelectedDestination(destination)}
            />
          ))}
        </div>

        {/* Info Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-gray-400 max-w-2xl mx-auto">
            Tous nos voyages incluent : Guide temporel certifié • Équipement de protection chronologique • 
            Assurance voyage temporel • Traducteur universel • Garantie retour
          </p>
        </motion.div>
      </div>

      {/* Booking Modal */}
      {selectedDestination && (
        <BookingModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}
    </section>
  );
};

export default Destinations;
