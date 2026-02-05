# 🚀 Guide de Démarrage Rapide

## Installation en 5 minutes

### 1. Prérequis
Assurez-vous d'avoir installé :
- Node.js 18+ ([Télécharger](https://nodejs.org))
- Un éditeur de code (VS Code recommandé)
- Git

### 2. Cloner et installer

```bash
# Cloner le projet
git clone https://github.com/votre-username/timetravel-agency.git
cd timetravel-agency

# Installer les dépendances
npm install
```

### 3. Configuration (Optionnel - Chatbot IA)

Si vous voulez un chatbot IA fonctionnel :

```bash
# Copier le fichier d'environnement
cp .env.example .env

# Éditer .env avec votre éditeur
# Remplacer 'your_mistral_api_key_here' par votre clé API
```

**Obtenir une clé API Mistral** (gratuit) :
1. Allez sur https://console.mistral.ai/
2. Créez un compte
3. Cliquez sur "API Keys" dans le menu
4. Générez une nouvelle clé
5. Copiez-la dans votre fichier `.env`

> 💡 Le chatbot fonctionne même sans API avec des réponses prédéfinies !

### 4. Ajouter vos images

Placez vos images dans `public/images/` :
- `paris-1889.jpg`
- `cretace.jpg`
- `florence-1504.jpg`

### 5. Lancer l'application

```bash
npm run dev
```

Ouvrez votre navigateur sur http://localhost:3000

🎉 **C'est tout !** Votre webapp est prête !

## Déployer sur Vercel (2 minutes)

### Méthode GitHub (Recommandée)

1. Pushez votre code sur GitHub :
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Allez sur [vercel.com](https://vercel.com)
3. Cliquez sur "New Project"
4. Importez votre repository GitHub
5. Ajoutez la variable d'environnement `VITE_MISTRAL_API_KEY` (si configurée)
6. Cliquez sur "Deploy"

✅ Votre site sera en ligne en ~2 minutes !

### Méthode CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel --prod
```

## Personnalisation Rapide

### Changer les couleurs

Éditez `tailwind.config.js` :
```javascript
colors: {
  primary: {
    500: '#votre-couleur',
  }
}
```

### Modifier les destinations

Éditez `src/components/Destinations.jsx` - array `destinationsData`

### Personnaliser le chatbot

Éditez le prompt système dans `src/components/ChatBot.jsx`

## Problèmes Fréquents

### Le chatbot ne répond pas
- Vérifiez votre clé API dans `.env`
- Redémarrez le serveur (`npm run dev`)
- Le fallback fonctionne toujours même sans API

### Les images ne s'affichent pas
- Vérifiez que les images sont dans `public/images/`
- Les noms doivent correspondre exactement
- Redémarrez le serveur

### Erreur de build
```bash
# Nettoyez et réinstallez
rm -rf node_modules package-lock.json
npm install
```

## Commandes Utiles

```bash
npm run dev      # Développement
npm run build    # Build production
npm run preview  # Tester le build
npm run lint     # Vérifier le code
```

## Besoin d'aide ?

- 📖 Consultez le [README complet](README.md)
- 🐛 Ouvrez une issue sur GitHub
- 💬 Contactez-moi sur [LinkedIn](votre-linkedin)

---

**Bon développement ! 🚀**
