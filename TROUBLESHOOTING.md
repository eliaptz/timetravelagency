# 🔧 Guide de Dépannage

Solutions aux problèmes courants rencontrés avec TimeTravel Agency.

## 📋 Table des Matières

- [Installation](#installation)
- [Développement](#développement)
- [Chatbot IA](#chatbot-ia)
- [Images](#images)
- [Build & Déploiement](#build--déploiement)
- [Performance](#performance)

---

## Installation

### ❌ Erreur : `npm install` échoue

**Symptômes** :
```bash
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions** :

1. **Nettoyer le cache npm**
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Utiliser la version correcte de Node**
   ```bash
   node -v  # Doit être 18+
   nvm use 18  # Si vous utilisez nvm
   ```

3. **Force l'installation**
   ```bash
   npm install --legacy-peer-deps
   ```

### ❌ Erreur : Module non trouvé

**Symptômes** :
```bash
Error: Cannot find module 'framer-motion'
```

**Solution** :
```bash
# Réinstaller les dépendances
npm install

# Si ça persiste, installer manuellement
npm install framer-motion react react-dom
```

---

## Développement

### ❌ Le serveur ne démarre pas

**Symptômes** :
```bash
Error: Port 3000 is already in use
```

**Solutions** :

1. **Changer le port**
   ```bash
   # Éditer vite.config.js
   server: {
     port: 3001  # Ou un autre port libre
   }
   ```

2. **Tuer le processus sur le port 3000**
   ```bash
   # macOS/Linux
   lsof -ti:3000 | xargs kill -9
   
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID [PID_NUMBER] /F
   ```

### ❌ Erreur : "Cannot read property of undefined"

**Symptômes** :
```bash
TypeError: Cannot read property 'map' of undefined
```

**Solution** :

Vérifiez vos données :
```javascript
// ❌ MAUVAIS
{destinations.map(...)}

// ✅ BON
{destinations?.map(...)}
// ou
{destinations && destinations.map(...)}
```

### ❌ Les changements ne s'affichent pas

**Solutions** :

1. **Hard refresh du navigateur**
   - Chrome/Edge : `Ctrl+Shift+R` (Windows) ou `Cmd+Shift+R` (Mac)
   - Firefox : `Ctrl+F5`

2. **Redémarrer le serveur**
   ```bash
   # Arrêter (Ctrl+C)
   # Relancer
   npm run dev
   ```

3. **Vider le cache du navigateur**
   - Ouvrir DevTools (F12)
   - Onglet Network
   - Cocher "Disable cache"

---

## Chatbot IA

### ❌ Le chatbot ne répond pas

**Symptômes** :
Le chatbot charge indéfiniment ou affiche une erreur.

**Solutions** :

1. **Vérifier la clé API**
   ```bash
   # Vérifier .env
   cat .env
   # Doit contenir : VITE_MISTRAL_API_KEY=sk-...
   ```

2. **Vérifier que .env est chargé**
   ```javascript
   // Dans ChatBot.jsx, ajouter temporairement :
   console.log('API Key:', import.meta.env.VITE_MISTRAL_API_KEY);
   ```

3. **Tester l'API directement**
   ```bash
   curl https://api.mistral.ai/v1/chat/completions \
     -H "Authorization: Bearer VOTRE_CLE" \
     -H "Content-Type: application/json" \
     -d '{"model":"mistral-small-latest","messages":[{"role":"user","content":"test"}]}'
   ```

4. **Vérifier le fallback**
   Le chatbot devrait toujours fonctionner avec des réponses prédéfinies.
   Si même ça ne marche pas, vérifiez la console pour les erreurs.

### ❌ Erreur 401 : Unauthorized

**Symptômes** :
```bash
Error: Request failed with status code 401
```

**Solutions** :

1. **Clé API invalide ou expirée**
   - Générez une nouvelle clé sur https://console.mistral.ai/
   - Remplacez dans `.env`
   - Redémarrez le serveur

2. **Clé API mal copiée**
   - Vérifiez qu'il n'y a pas d'espaces
   - La clé doit commencer par un préfixe spécifique

### ❌ Erreur 429 : Too Many Requests

**Symptômes** :
```bash
Error: Rate limit exceeded
```

**Solutions** :

1. **Vous avez dépassé le quota gratuit**
   - Vérifiez votre usage sur https://console.mistral.ai/usage
   - Attendez ou passez à un plan payant

2. **Limitez les appels dans le code**
   ```javascript
   // Ajoutez un debounce
   const [typing, setTyping] = useState(false);
   
   const debouncedSend = debounce(() => {
     sendMessageToAI(message);
   }, 1000);
   ```

---

## Images

### ❌ Les images ne s'affichent pas

**Symptômes** :
Les cartes de destinations sont vides ou affichent un gradient.

**Solutions** :

1. **Vérifier le chemin des images**
   ```bash
   ls public/images/
   # Doit lister : paris-1889.jpg, cretace.jpg, florence-1504.jpg
   ```

2. **Vérifier les noms de fichiers**
   Les noms doivent correspondre EXACTEMENT :
   ```javascript
   // Dans Destinations.jsx
   image: '/images/paris-1889.jpg'  // Sensible à la casse !
   ```

3. **Vérifier les extensions**
   ```bash
   # Si vos images sont .png
   mv paris-1889.png paris-1889.jpg
   # Ou changez dans le code
   ```

4. **Redémarrer le serveur**
   ```bash
   # Les fichiers public/ nécessitent parfois un restart
   npm run dev
   ```

### ❌ Images trop lourdes / lentes à charger

**Solutions** :

1. **Optimiser avec TinyPNG**
   - Allez sur https://tinypng.com
   - Uploadez vos images
   - Téléchargez les versions optimisées

2. **Convertir en WebP**
   ```bash
   # Installer cwebp
   brew install webp  # macOS
   
   # Convertir
   cwebp -q 80 paris-1889.jpg -o paris-1889.webp
   ```

3. **Utiliser des images responsives**
   ```javascript
   <img 
     src="/images/paris-1889.jpg"
     srcSet="/images/paris-1889-small.jpg 640w,
             /images/paris-1889.jpg 1920w"
     sizes="(max-width: 640px) 640px, 1920px"
   />
   ```

---

## Build & Déploiement

### ❌ Build échoue

**Symptômes** :
```bash
npm run build
# Erreurs de compilation
```

**Solutions** :

1. **Vérifier les imports**
   ```javascript
   // ❌ MAUVAIS
   import Component from './Component'
   
   // ✅ BON
   import Component from './Component.jsx'
   ```

2. **Vérifier les variables d'environnement**
   ```bash
   # Sur Vercel, assurez-vous d'avoir ajouté VITE_MISTRAL_API_KEY
   # Settings → Environment Variables
   ```

3. **Nettoyer et rebuild**
   ```bash
   rm -rf dist
   npm run build
   ```

### ❌ Déploiement Vercel échoue

**Symptômes** :
Le déploiement est rouge dans le dashboard Vercel.

**Solutions** :

1. **Vérifier les logs**
   - Allez sur Vercel → Votre projet → Deployments
   - Cliquez sur le déploiement échoué
   - Lisez les logs pour l'erreur exacte

2. **Build en local d'abord**
   ```bash
   npm run build
   npm run preview
   # Si ça marche en local, le problème est dans la config Vercel
   ```

3. **Vérifier vercel.json**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "framework": "vite"
   }
   ```

### ❌ Le site déployé est cassé

**Symptômes** :
Le site fonctionne en local mais pas en production.

**Solutions** :

1. **Vérifier les chemins d'assets**
   ```javascript
   // ❌ MAUVAIS (chemins absolus)
   src="/src/assets/image.jpg"
   
   // ✅ BON (chemins relatifs depuis public/)
   src="/images/image.jpg"
   ```

2. **Vérifier les variables d'environnement**
   - Vercel → Settings → Environment Variables
   - Vérifiez que `VITE_MISTRAL_API_KEY` est définie

3. **Forcer un redéploiement**
   ```bash
   vercel --force
   ```

---

## Performance

### ❌ Le site est lent

**Solutions** :

1. **Optimiser les images**
   - Voir section [Images](#images)
   - Lazy loading : `loading="lazy"`

2. **Réduire les bundles**
   ```bash
   # Analyser le bundle
   npm run build
   npx vite-bundle-visualizer
   ```

3. **Optimiser les animations**
   ```javascript
   // Utiliser will-change avec parcimonie
   <motion.div style={{ willChange: 'transform' }}>
   ```

4. **Code splitting**
   ```javascript
   // Lazy loading des composants
   const Quiz = lazy(() => import('./components/Quiz'));
   ```

### ❌ Les animations sont saccadées

**Solutions** :

1. **Utiliser GPU acceleration**
   ```css
   .animated-element {
     transform: translateZ(0);
     will-change: transform;
   }
   ```

2. **Réduire les animations sur mobile**
   ```javascript
   const isMobile = window.innerWidth < 768;
   
   <motion.div
     animate={{ y: isMobile ? 0 : -10 }}
     transition={{ duration: isMobile ? 0 : 0.6 }}
   >
   ```

---

## 🆘 Toujours bloqué ?

### Checklist de debugging

- [ ] J'ai lu le README et QUICKSTART
- [ ] J'ai vérifié les versions (Node 18+, npm 9+)
- [ ] J'ai nettoyé node_modules et réinstallé
- [ ] J'ai vérifié la console pour les erreurs
- [ ] J'ai testé dans un autre navigateur
- [ ] J'ai redémarré le serveur
- [ ] J'ai vérifié que mes fichiers sont sauvegardés

### Obtenir de l'aide

1. **Recherchez dans les Issues GitHub**
   - Votre problème a peut-être déjà été résolu

2. **Créez une nouvelle Issue**
   - Utilisez le template de bug
   - Incluez les logs d'erreur complets
   - Partagez votre environnement

3. **Contactez-moi**
   - Email : [votre-email]
   - LinkedIn : [votre-linkedin]

---

## 📚 Ressources Utiles

- [Documentation React DevTools](https://react.dev/learn/react-developer-tools)
- [Vite Troubleshooting](https://vitejs.dev/guide/troubleshooting)
- [Vercel Docs](https://vercel.com/docs)
- [Mistral AI Support](https://discord.gg/mistralai)

---

**Dernière mise à jour** : Février 2024

*Ce guide est régulièrement mis à jour avec de nouveaux problèmes et solutions.*
