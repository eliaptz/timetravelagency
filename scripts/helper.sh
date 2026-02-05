#!/bin/bash

# 🕰️ TimeTravel Agency - Script d'aide
# Ensemble de commandes utiles pour le développement

# Couleurs pour le terminal
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🕰️  TimeTravel Agency - Script d'aide${NC}"
echo ""

# Fonction pour afficher le menu
show_menu() {
    echo -e "${GREEN}Que voulez-vous faire ?${NC}"
    echo ""
    echo "1) 🚀 Lancer le serveur de développement"
    echo "2) 🏗️  Build pour la production"
    echo "3) 👀 Prévisualiser le build"
    echo "4) 🧹 Nettoyer node_modules et réinstaller"
    echo "5) 📦 Installer une nouvelle dépendance"
    echo "6) 🔧 Vérifier le code (lint)"
    echo "7) 📸 Optimiser les images"
    echo "8) 🚀 Déployer sur Vercel"
    echo "9) 🔑 Configurer l'API Mistral"
    echo "10) 📖 Ouvrir la documentation"
    echo "0) ❌ Quitter"
    echo ""
}

# Fonction pour lancer le dev server
dev() {
    echo -e "${BLUE}Lancement du serveur de développement...${NC}"
    npm run dev
}

# Fonction pour build
build() {
    echo -e "${BLUE}Build de production...${NC}"
    npm run build
    echo -e "${GREEN}✓ Build terminé ! Fichiers dans /dist${NC}"
}

# Fonction pour preview
preview() {
    echo -e "${BLUE}Prévisualisation du build...${NC}"
    npm run preview
}

# Fonction pour nettoyer et réinstaller
clean() {
    echo -e "${YELLOW}Nettoyage de node_modules...${NC}"
    rm -rf node_modules package-lock.json
    echo -e "${BLUE}Réinstallation des dépendances...${NC}"
    npm install
    echo -e "${GREEN}✓ Terminé !${NC}"
}

# Fonction pour installer une dépendance
install_dep() {
    echo -e "${BLUE}Nom du package à installer :${NC}"
    read package_name
    npm install $package_name
    echo -e "${GREEN}✓ $package_name installé !${NC}"
}

# Fonction pour lint
lint() {
    echo -e "${BLUE}Vérification du code...${NC}"
    npm run lint
}

# Fonction pour optimiser les images
optimize_images() {
    echo -e "${BLUE}Optimisation des images...${NC}"
    if command -v imageoptim &> /dev/null; then
        imageoptim public/images/
        echo -e "${GREEN}✓ Images optimisées !${NC}"
    else
        echo -e "${RED}ImageOptim n'est pas installé.${NC}"
        echo "Installez-le : brew install imageoptim-cli"
    fi
}

# Fonction pour déployer sur Vercel
deploy() {
    echo -e "${BLUE}Déploiement sur Vercel...${NC}"
    if command -v vercel &> /dev/null; then
        vercel --prod
    else
        echo -e "${RED}Vercel CLI n'est pas installé.${NC}"
        echo "Installez-le : npm i -g vercel"
    fi
}

# Fonction pour configurer l'API
configure_api() {
    echo -e "${BLUE}Configuration de l'API Mistral${NC}"
    echo ""
    if [ -f .env ]; then
        echo -e "${YELLOW}.env existe déjà${NC}"
        echo "Voulez-vous le remplacer ? (o/n)"
        read replace
        if [ "$replace" != "o" ]; then
            return
        fi
    fi
    
    cp .env.example .env
    echo -e "${GREEN}✓ Fichier .env créé${NC}"
    echo ""
    echo -e "${BLUE}Entrez votre clé API Mistral :${NC}"
    echo "(Obtenez-la sur https://console.mistral.ai/)"
    read api_key
    
    if [ ! -z "$api_key" ]; then
        sed -i '' "s/your_mistral_api_key_here/$api_key/" .env
        echo -e "${GREEN}✓ Clé API configurée !${NC}"
        echo -e "${YELLOW}Redémarrez le serveur pour appliquer les changements${NC}"
    else
        echo -e "${YELLOW}Clé non fournie. Éditez .env manuellement${NC}"
    fi
}

# Fonction pour ouvrir la doc
open_docs() {
    echo -e "${BLUE}Quelle documentation voulez-vous ouvrir ?${NC}"
    echo "1) README.md"
    echo "2) QUICKSTART.md"
    echo "3) API_GUIDE.md"
    echo "4) CHANGELOG.md"
    read doc_choice
    
    case $doc_choice in
        1) open README.md 2>/dev/null || xdg-open README.md 2>/dev/null || cat README.md ;;
        2) open QUICKSTART.md 2>/dev/null || xdg-open QUICKSTART.md 2>/dev/null || cat QUICKSTART.md ;;
        3) open API_GUIDE.md 2>/dev/null || xdg-open API_GUIDE.md 2>/dev/null || cat API_GUIDE.md ;;
        4) open CHANGELOG.md 2>/dev/null || xdg-open CHANGELOG.md 2>/dev/null || cat CHANGELOG.md ;;
        *) echo -e "${RED}Choix invalide${NC}" ;;
    esac
}

# Boucle principale
while true; do
    show_menu
    read -p "Votre choix : " choice
    echo ""
    
    case $choice in
        1) dev ;;
        2) build ;;
        3) preview ;;
        4) clean ;;
        5) install_dep ;;
        6) lint ;;
        7) optimize_images ;;
        8) deploy ;;
        9) configure_api ;;
        10) open_docs ;;
        0) echo -e "${GREEN}Au revoir ! 👋${NC}"; exit 0 ;;
        *) echo -e "${RED}Choix invalide${NC}" ;;
    esac
    
    echo ""
    echo -e "${BLUE}Appuyez sur Entrée pour continuer...${NC}"
    read
    clear
done
