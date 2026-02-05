# 🤖 Guide d'Intégration API Mistral

## Configuration du Chatbot IA

Le chatbot de TimeTravel Agency utilise l'API Mistral AI pour générer des réponses intelligentes et contextuelles.

## Étape 1 : Obtenir une Clé API

1. Créez un compte sur [Mistral AI Console](https://console.mistral.ai/)
2. Vérifiez votre email
3. Naviguez vers la section "API Keys"
4. Cliquez sur "Create new API key"
5. Copiez la clé (elle ne sera affichée qu'une fois !)

## Étape 2 : Configuration Locale

```bash
# Copiez le template
cp .env.example .env

# Éditez le fichier .env
nano .env  # ou utilisez votre éditeur préféré
```

Ajoutez votre clé :
```env
VITE_MISTRAL_API_KEY=votre_cle_api_mistral_ici
```

⚠️ **Important** : Ne commitez JAMAIS le fichier `.env` sur Git !

## Étape 3 : Redémarrer le Serveur

```bash
# Arrêtez le serveur (Ctrl+C)
# Relancez-le
npm run dev
```

## Configuration Vercel (Production)

### Via l'Interface

1. Allez dans votre projet Vercel
2. Settings → Environment Variables
3. Ajoutez :
   - Name: `VITE_MISTRAL_API_KEY`
   - Value: `votre_cle_api`
   - Environment: Production, Preview, Development
4. Redéployez

### Via CLI

```bash
vercel env add VITE_MISTRAL_API_KEY
# Entrez votre clé quand demandé
# Sélectionnez tous les environnements

# Redéployez
vercel --prod
```

## Personnalisation du Chatbot

### Modifier la Personnalité

Éditez `src/components/ChatBot.jsx` :

```javascript
const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
  // ...
  body: JSON.stringify({
    model: 'mistral-small-latest',
    messages: [
      {
        role: 'system',
        content: `Votre nouveau prompt système...
        
Exemples :
- Plus formel : "Vous êtes un conseiller de voyage de luxe..."
- Plus casual : "Tu es un guide cool passionné d'histoire..."
- Plus technique : "Vous êtes un expert en chronologie..."
        `
      }
    ],
    temperature: 0.7,  // 0.0 = précis, 1.0 = créatif
    max_tokens: 300    // Longueur max de la réponse
  })
})
```

### Ajouter du Contexte

Pour que le chatbot connaisse de nouvelles destinations ou informations :

```javascript
{
  role: 'system',
  content: `...
  
Nouvelles destinations :
- Égypte Antique -1350 (Akhenaton) - 3,999€ - 8 jours
  Pyramides, Sphinx, Vallée des Rois

Prix spéciaux :
- Réduction -20% pour étudiants
- Offre famille 4 personnes : -15%
  `
}
```

### Réponses de Secours (Fallback)

Si l'API n'est pas configurée, le système utilise `getFallbackResponse()`. 

Pour ajouter de nouvelles réponses :

```javascript
const getFallbackResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  // Ajoutez vos propres règles
  if (lowerMessage.includes('prix famille')) {
    return 'Pour les familles de 4+, nous offrons -15% ! 👨‍👩‍👧‍👦';
  }
  
  if (lowerMessage.includes('étudiants')) {
    return 'Réduction -20% sur présentation de carte étudiante ! 🎓';
  }
  
  // ... autres cas
}
```

## Modèles Mistral Disponibles

```javascript
// Mistral Small - Rapide et économique (RECOMMANDÉ)
model: 'mistral-small-latest'

// Mistral Medium - Plus puissant
model: 'mistral-medium-latest'

// Mistral Large - Le plus performant (coûteux)
model: 'mistral-large-latest'
```

## Limitations et Quotas

### Compte Gratuit
- ~1000 requêtes/jour
- ~100K tokens/jour
- Suffisant pour un projet de test

### Monitoring
Surveillez votre usage sur https://console.mistral.ai/usage

## Gestion des Erreurs

Le chatbot gère automatiquement :
- ✅ Absence de clé API → Fallback activé
- ✅ Erreur réseau → Message d'erreur convivial
- ✅ Rate limit dépassé → Fallback activé
- ✅ Token limit → Messages tronqués

## Sécurité

### ⚠️ À FAIRE
- ✅ Utiliser des variables d'environnement
- ✅ Ne jamais commit la clé API
- ✅ Limiter les tokens par requête
- ✅ Valider les entrées utilisateur

### ❌ À NE PAS FAIRE
- ❌ Hardcoder la clé dans le code
- ❌ Partager la clé publiquement
- ❌ Utiliser la même clé en dev et prod
- ❌ Stocker la clé côté client

## Alternatives à Mistral

Si vous préférez une autre API :

### OpenAI GPT
```javascript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  headers: {
    'Authorization': `Bearer ${process.env.VITE_OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [...]
  })
})
```

### Claude API (Anthropic)
```javascript
const response = await fetch('https://api.anthropic.com/v1/messages', {
  headers: {
    'x-api-key': process.env.VITE_ANTHROPIC_API_KEY,
    'anthropic-version': '2023-06-01'
  },
  body: JSON.stringify({
    model: 'claude-3-haiku-20240307',
    messages: [...]
  })
})
```

## Debugging

### Activer les Logs

```javascript
// Dans ChatBot.jsx
const sendMessageToAI = async (userMessage) => {
  console.log('🔍 Sending to AI:', userMessage);
  
  try {
    const response = await fetch(...);
    const data = await response.json();
    
    console.log('✅ AI Response:', data);
    return data.choices[0].message.content;
  } catch (error) {
    console.error('❌ AI Error:', error);
    return getFallbackResponse(userMessage);
  }
}
```

### Tester l'API Directement

```bash
curl https://api.mistral.ai/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "model": "mistral-small-latest",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

## Support

- 📖 [Documentation Mistral](https://docs.mistral.ai/)
- 💬 [Discord Mistral](https://discord.gg/mistralai)
- 🐛 [GitHub Issues](https://github.com/mistralai/mistral-common/issues)

---

**Besoin d'aide ?** N'hésitez pas à consulter les exemples dans le code !
