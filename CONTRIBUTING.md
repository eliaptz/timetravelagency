# 🤝 Guide de Contribution

Merci de votre intérêt pour contribuer à TimeTravel Agency ! Ce guide vous aidera à participer au projet.

## 📋 Code de Conduite

- Soyez respectueux et professionnel
- Accueillez les nouveaux contributeurs
- Acceptez les critiques constructives
- Concentrez-vous sur ce qui est meilleur pour la communauté

## 🚀 Comment Contribuer

### Signaler un Bug 🐛

Si vous trouvez un bug :

1. Vérifiez qu'il n'a pas déjà été signalé dans les [Issues](https://github.com/votre-username/timetravel-agency/issues)
2. Créez une nouvelle issue avec :
   - Un titre clair et descriptif
   - Les étapes pour reproduire le bug
   - Le comportement attendu vs actuel
   - Captures d'écran si pertinent
   - Votre environnement (OS, navigateur, version Node)

**Template de bug** :
```markdown
## Description
[Décrivez le bug clairement]

## Étapes pour reproduire
1. Aller sur '...'
2. Cliquer sur '...'
3. Voir l'erreur

## Comportement attendu
[Ce qui devrait se passer]

## Comportement actuel
[Ce qui se passe réellement]

## Environnement
- OS: [ex. macOS 14.0]
- Navigateur: [ex. Chrome 120]
- Node: [ex. 18.17.0]
```

### Proposer une Fonctionnalité 💡

Pour suggérer une amélioration :

1. Créez une issue avec le label `enhancement`
2. Décrivez :
   - Le problème que ça résout
   - La solution proposée
   - Des alternatives considérées
   - Des mockups/wireframes si applicable

### Soumettre une Pull Request 🔄

1. **Fork** le repository
2. **Clone** votre fork
   ```bash
   git clone https://github.com/votre-username/timetravel-agency.git
   cd timetravel-agency
   ```

3. **Créez une branche** pour votre feature
   ```bash
   git checkout -b feature/nom-de-la-feature
   ```

4. **Installez** les dépendances
   ```bash
   npm install
   ```

5. **Développez** votre fonctionnalité
   - Écrivez du code propre et commenté
   - Suivez les conventions du projet
   - Testez vos modifications

6. **Commitez** vos changements
   ```bash
   git add .
   git commit -m "feat: ajout de [fonctionnalité]"
   ```

7. **Pushez** vers votre fork
   ```bash
   git push origin feature/nom-de-la-feature
   ```

8. **Ouvrez** une Pull Request
   - Décrivez vos changements
   - Liez les issues concernées
   - Ajoutez des captures d'écran

## 📝 Conventions de Code

### JavaScript/React

```javascript
// ✅ BON
const DestinationCard = ({ destination, onBook }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    onBook(destination);
  };
  
  return (
    <motion.div className="card">
      {/* Contenu */}
    </motion.div>
  );
};

// ❌ MAUVAIS
const destinationcard = (props) => {
  return <div onClick={() => props.onBook(props.destination)}>...</div>
}
```

### CSS/Tailwind

```jsx
// ✅ BON - Classes organisées par catégorie
<div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">

// ❌ MAUVAIS - Classes désorganisées
<div className="p-4 bg-gray-900 flex rounded-lg hover:bg-gray-800 items-center justify-between transition-colors">
```

### Commits

Suivez la convention [Conventional Commits](https://www.conventionalcommits.org/fr/) :

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage, point-virgules manquants, etc.
- `refactor:` Refactorisation du code
- `test:` Ajout de tests
- `chore:` Tâches de maintenance

**Exemples** :
```bash
feat: ajout du système de paiement Stripe
fix: correction du bug d'affichage des images
docs: mise à jour du README avec nouvelles instructions
style: formatage du code selon ESLint
refactor: optimisation du composant ChatBot
```

## 🧪 Tests

Avant de soumettre une PR :

1. **Build** le projet
   ```bash
   npm run build
   ```

2. **Lint** le code
   ```bash
   npm run lint
   ```

3. **Tester** en local
   ```bash
   npm run dev
   ```

4. Vérifiez :
   - ✅ Toutes les pages fonctionnent
   - ✅ Le responsive est correct
   - ✅ Pas d'erreurs console
   - ✅ Les animations sont fluides

## 📂 Structure du Projet

Comprendre l'architecture avant de contribuer :

```
src/
├── components/          # Composants React
│   ├── Header.jsx      # Navigation
│   ├── Hero.jsx        # Hero section
│   ├── Destinations.jsx # Galerie
│   ├── ChatBot.jsx     # Assistant IA
│   └── ...
├── App.jsx             # Composant racine
├── main.jsx            # Point d'entrée
└── index.css           # Styles globaux
```

## 🎨 Design Guidelines

### Couleurs
- Primary: Amber/Gold (`#f59e0b`, `#fbbf24`)
- Background: Gray-900 (`#111827`)
- Text: White/Gray-300
- Accents: Gradients amber

### Typographie
- Font: Inter
- Titres: `text-2xl` à `text-5xl`, `font-bold`
- Corps: `text-base` à `text-lg`

### Animations
- Durée: 0.3s à 0.6s
- Easing: `ease-out`, `ease-in-out`
- Hover: `scale(1.05)` ou changement de couleur

### Responsive
- Mobile First
- Breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px)

## 🔍 Review Process

Votre PR sera reviewée selon :

1. **Qualité du code**
   - Propre et lisible
   - Bien commenté
   - Suit les conventions

2. **Fonctionnalité**
   - Fonctionne comme prévu
   - Pas de régression
   - Tests passent

3. **Design**
   - Cohérent avec le reste
   - Responsive
   - Accessible

4. **Documentation**
   - README mis à jour si nécessaire
   - Commentaires dans le code
   - CHANGELOG mis à jour

## 📞 Questions ?

- 💬 Ouvrez une [Discussion](https://github.com/votre-username/timetravel-agency/discussions)
- 📧 Contactez-moi : [votre-email]
- 🐛 Signalez un bug : [Issues](https://github.com/votre-username/timetravel-agency/issues)

## 🎓 Ressources

- [Documentation React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Mistral AI Docs](https://docs.mistral.ai/)

---

**Merci pour vos contributions ! 🙏**

Chaque contribution, grande ou petite, est précieuse pour améliorer TimeTravel Agency.
