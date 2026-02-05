# 🕰️ TimeTravel Agency

Une webapp moderne et interactive présentant une agence de voyage temporel fictive de luxe. Projet réalisé dans le cadre du M1/M2 Digital & IA.

![TimeTravel Agency](https://img.shields.io/badge/Status-En%20développement-yellow)
![React](https://img.shields.io/badge/React-18.2-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)

## 🌟 Aperçu du Projet

TimeTravel Agency propose une expérience immersive de voyage temporel vers trois destinations historiques fascinantes :

- **Paris 1889** - La Belle Époque et l'inauguration de la Tour Eiffel
- **Crétacé -65M** - L'ère des dinosaures
- **Florence 1504** - La Renaissance italienne avec Michel-Ange et Léonard de Vinci

## ✨ Fonctionnalités

### Pages et Sections
- ✅ **Hero Section** - Page d'accueil animée avec effets visuels
- ✅ **Galerie de Destinations** - 3 cards interactives avec informations détaillées
- ✅ **Chatbot IA** - Assistant virtuel conversationnel alimenté par Mistral AI
- ✅ **Quiz Personnalisé** - 4 questions pour recommander la destination idéale
- ✅ **Formulaire de Réservation** - Modal de réservation avec validation
- ✅ **Navigation Fluide** - Scroll smooth entre les sections

### Animations et Design
- 🎨 Design moderne avec thème sombre et accents dorés
- ✨ Animations subtiles avec Framer Motion
- 📱 100% Responsive (mobile-first)
- 🎭 Effets hover et transitions fluides
- ⚡ Lazy loading pour les images

### Chatbot IA
- 💬 Widget de chat flottant en bas à droite
- 🤖 Intégration avec l'API Mistral AI
- 🧠 Personnalité d'expert en voyage temporel
- 💡 Réponses de secours si l'API n'est pas configurée
- ⚡ Réponses rapides et contextuelles

## 🛠️ Technologies Utilisées

### Frontend
- **React 18.2** - Framework JavaScript
- **Tailwind CSS 3.4** - Framework CSS utility-first
- **Framer Motion 10.16** - Bibliothèque d'animations
- **Vite 5.0** - Build tool et dev server ultra-rapide

### IA & API
- **Mistral AI API** - Modèle `mistral-small-latest` pour le chatbot
- Alternative : Système de fallback avec réponses prédéfinies

### Déploiement
- **Vercel** - Hébergement et déploiement continu
- **Git** - Versioning

## 📦 Installation

### Prérequis
- Node.js 18+ et npm
- Compte Mistral AI (optionnel pour le chatbot)

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone https://github.com/votre-username/timetravel-agency.git
cd timetravel-agency
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration du chatbot IA (optionnel)**
```bash
# Copier le fichier d'environnement
cp .env.example .env

# Éditer .env et ajouter votre clé API Mistral
# VITE_MISTRAL_API_KEY=votre_cle_api_ici
```

Pour obtenir une clé API Mistral :
- Créez un compte sur https://console.mistral.ai/
- Générez une nouvelle clé API
- Copiez-la dans le fichier `.env`

> 💡 **Note** : Le chatbot fonctionne même sans API key grâce au système de fallback !

4. **Ajouter vos images**
Placez vos images de destinations dans `/public/images/` :
- `paris-1889.jpg`
- `cretace.jpg`
- `florence-1504.jpg`

5. **Lancer le serveur de développement**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## 🚀 Déploiement sur Vercel

### Méthode 1 : Via l'interface Vercel (Recommandée)

1. Créez un compte sur [Vercel](https://vercel.com)
2. Cliquez sur "New Project"
3. Importez votre repository GitHub
4. Configurez les variables d'environnement :
   - `VITE_MISTRAL_API_KEY` : Votre clé API Mistral
5. Cliquez sur "Deploy"

### Méthode 2 : Via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Ajouter les variables d'environnement
vercel env add VITE_MISTRAL_API_KEY
```

### Configuration automatique

Le projet est pré-configuré pour Vercel :
- Build command : `npm run build`
- Output directory : `dist`
- Framework preset : Vite

## 📁 Structure du Projet

```
timetravel-agency/
├── public/
│   └── images/              # Images des destinations (à ajouter)
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Navigation principale
│   │   ├── Hero.jsx         # Section hero animée
│   │   ├── Destinations.jsx # Galerie des destinations
│   │   ├── DestinationCard.jsx # Card individuelle
│   │   ├── ChatBot.jsx      # Assistant IA conversationnel
│   │   ├── Quiz.jsx         # Quiz de recommandation
│   │   ├── BookingModal.jsx # Modal de réservation
│   │   └── Footer.jsx       # Pied de page
│   ├── App.jsx              # Composant principal
│   ├── main.jsx             # Point d'entrée
│   └── index.css            # Styles globaux + Tailwind
├── index.html               # Template HTML
├── package.json             # Dépendances
├── tailwind.config.js       # Configuration Tailwind
├── vite.config.js           # Configuration Vite
└── README.md                # Documentation (ce fichier)
```

## 🎨 Personnalisation

### Modifier les destinations

Éditez `src/components/Destinations.jsx` et modifiez l'array `destinationsData` :

```javascript
const destinationsData = [
  {
    id: 1,
    title: 'Votre Destination',
    subtitle: 'Sous-titre',
    period: 'Époque',
    description: 'Description...',
    highlights: ['Point 1', 'Point 2', ...],
    price: '2,499€',
    duration: '7 jours',
    image: '/images/votre-image.jpg',
    color: 'from-rose-500 to-pink-600'
  }
]
```

### Modifier la personnalité du chatbot

Éditez le system prompt dans `src/components/ChatBot.jsx` :

```javascript
const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
  // ...
  body: JSON.stringify({
    messages: [
      {
        role: 'system',
        content: `Votre nouveau prompt système ici...`
      }
    ]
  })
})
```

### Modifier les couleurs

Éditez `tailwind.config.js` pour personnaliser la palette :

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Vos couleurs
      }
    }
  }
}
```

## 🤖 Utilisation des Outils IA

Ce projet a été développé avec l'assistance d'outils d'IA pour accélérer le développement :

### Outils utilisés
- **Claude (Anthropic)** - Génération du code de base, architecture et composants
- **Mistral AI** - API pour le chatbot conversationnel
- **GitHub Copilot** - Autocomplétion et suggestions de code (optionnel)

### Parties générées par IA
- ✅ Structure initiale des composants React
- ✅ Configuration Tailwind et Vite
- ✅ Intégration de Framer Motion
- ✅ Logique du chatbot et fallbacks
- ✅ Animations et transitions
- ✅ Documentation README

### Parties développées manuellement
- 🎨 Choix des destinations et contenus
- 📸 Images et assets visuels
- 🎯 Logique métier spécifique
- 🐛 Debugging et optimisations
- 🎨 Ajustements de design final

### Transparence et Apprentissage
L'utilisation d'IA a permis de :
- ⚡ Accélérer le développement (gain de ~70% de temps)
- 📚 Apprendre les bonnes pratiques React et Tailwind
- 🎨 Explorer des animations complexes avec Framer Motion
- 🧠 Comprendre l'intégration d'APIs IA

**Important** : Chaque ligne de code générée a été relue, comprise et adaptée aux besoins du projet.

## 🎯 Fonctionnalités Futures

- [ ] Système de paiement Stripe
- [ ] Galerie d'images interactive (lightbox)
- [ ] Blog de voyage temporel
- [ ] Témoignages clients
- [ ] Mode multi-langues (FR/EN)
- [ ] Dashboard admin
- [ ] Notifications push
- [ ] Intégration calendrier de réservation

## 🐛 Problèmes Connus

- Les images de destinations doivent être ajoutées manuellement
- Le chatbot nécessite une clé API Mistral pour fonctionner optimalement
- Certains navigateurs anciens peuvent avoir des problèmes avec Framer Motion

## 📝 Scripts Disponibles

```bash
npm run dev      # Lance le serveur de développement
npm run build    # Compile pour la production
npm run preview  # Prévisualise la version de production
npm run lint     # Vérifie le code avec ESLint
```

## 🤝 Contribution

Ce projet est un travail académique, mais les suggestions sont les bienvenues !

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📜 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👨‍🎓 Auteur

**[Votre Nom]**
- Étudiant M1/M2 Digital & IA
- [LinkedIn](https://linkedin.com/in/votre-profil)
- [Portfolio](https://votre-portfolio.com)

## 🙏 Crédits

### Technologies
- [React](https://react.dev) - Framework JavaScript
- [Tailwind CSS](https://tailwindcss.com) - Framework CSS
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Mistral AI](https://mistral.ai) - API de chatbot
- [Vite](https://vitejs.dev) - Build tool

### Ressources IA
- [Claude by Anthropic](https://www.anthropic.com/claude) - Assistance au développement
- [Mistral AI](https://mistral.ai) - Chatbot conversationnel

### Inspiration
- Design inspiré des agences de voyage premium
- UI/UX inspiré de [Awwwards](https://www.awwwards.com)

---

<p align="center">
  Fait avec ⏳ et passion pour l'Histoire | Projet M1/M2 Digital & IA 2024
</p>
