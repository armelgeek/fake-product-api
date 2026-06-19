# 📦 Fake Products API - Mock & Déploiement GitHub Pages

Ce projet propose une API minimale en **Express.js** pour simuler un catalogue de produits avec les attributs de stock, de rayons, d'EAN et de tarifs. Il est conçu pour être exécuté localement en développement et exporté de manière statique pour être hébergé gratuitement sur **GitHub Pages**.

---

## 📊 Modèle de Réponse JSON & Pagination

L'API renvoie désormais un objet enveloppe contenant les données et les métadonnées de pagination.

### Exemple de réponse

```json
{
  "data": [
    {
      "ean": "3250390151234",
      "article": "100432",
      "category": "Grocery",
      "designation": "Wheat Flour T55 Francine 1kg",
      "availableStock": 150,
      "stockDays": 12,
      "priceHT": 1.15
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 30,
    "totalPages": 3
  }
}
```

### Paramètres de requête supportés (Local)
En local, vous pouvez paginer les résultats avec les paramètres `page` et `limit` :
*   `GET /products?page=2&limit=5`

---

## 🚀 Démarrage Rapide

### 1. Installation des Dépendances

Installez d'abord les packages nécessaires :

```bash
npm install
```

### 2. Développement Local (Express.js)

Pour lancer le serveur de développement local avec rechargement automatique (`nodemon`) :

```bash
npm run dev
```

*   **URL du Serveur** : `http://localhost:3001`
*   **Endpoint API Produits** : `http://localhost:3001/products` (ou `http://localhost:3001/products.json`)
*   Le serveur gère nativement le **CORS** afin que vous puissiez l'interroger depuis votre frontend React ou n'importe quel autre domaine.

---

## 🌐 Déploiement sur GitHub Pages

GitHub Pages n'exécutant pas de code Node.js côté serveur, nous convertisons l'API Express en fichiers statiques JSON (qui agissent comme des endpoints en lecture seule).

### 1. Configurer le projet pour GitHub

1.  Initialisez un dépôt Git (si ce n'est pas déjà fait) :
    ```bash
    git init
    ```
2.  Ajoutez votre dépôt distant GitHub :
    ```bash
    git remote add origin https://github.com/VOTRE_NOM_UTILISATEUR/NOM_DE_VOTRE_REPO.git
    ```
3.  Ajoutez le champ `"homepage"` dans votre fichier `package.json` :
    ```json
    "homepage": "https://VOTRE_NOM_UTILISATEUR.github.io/NOM_DE_VOTRE_REPO"
    ```

### 2. Compiler & Déployer en 1 ligne

Pour compiler les fichiers statiques (génère le dossier `/dist`) et les publier directement sur la branche `gh-pages` de votre dépôt GitHub :

```bash
npm run deploy
```

Une fois le déploiement terminé, vos endpoints seront accessibles publiquement :
*   **Interface interactive** : `https://VOTRE_NOM_UTILISATEUR.github.io/NOM_DE_VOTRE_REPO/`
*   **Endpoint API JSON** : `https://VOTRE_NOM_UTILISATEUR.github.io/NOM_DE_VOTRE_REPO/products.json`

---

## ⚡ Exemple d'intégration Fetch

Vous pouvez interroger cette API depuis votre frontend en utilisant des URLs relatives ou conditionnelles selon l'environnement :

```javascript
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001/products?page=1&limit=10'
  : 'https://VOTRE_NOM_UTILISATEUR.github.io/NOM_DE_VOTRE_REPO/products.json';

// Fetch des produits
fetch(API_URL)
  .then(res => res.json())
  .then(response => {
    // Les produits sont dans response.data
    console.log("Produits chargés :", response.data);
    console.log("Pagination info :", response.pagination);
  })
  .catch(err => console.error("Erreur de chargement :", err));
```
