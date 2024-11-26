Voici un README structuré pour ton projet **VoteDecentralise - Frontend** :

---

# VoteDecentralise Frontend

Ce projet est une application React permettant d'interagir avec le smart contract de vote décentralisé **Voting**. Elle permet de connecter un portefeuille Ethereum via MetaMask, de créer des élections, de voter pour des candidats, et de visualiser les résultats en temps réel.

---

## **Installation et configuration**

### **Prérequis**
- **Node.js** (v16 ou supérieur)
- **npm** (installé avec Node.js)
- **Ganache** pour simuler un réseau local Ethereum
- **MetaMask** pour interagir avec la blockchain via un navigateur

---

### **Étapes d'installation**
1. Clone ce dépôt dans ton répertoire local :
   ```bash
   git clone <lien-du-repo>
   cd voting-frontend
   ```

2. Installe les dépendances :
   ```bash
   npm install
   ```

3. Configure le fichier `config.js` :
   - Crée un fichier `config.js` dans le dossier `src`.
   - Ajoute l'adresse et l'ABI de ton contrat déployé :
     ```javascript
     export const VOTING_ADDRESS = "0xA1B2613dC3ce1997a18E563a69Cb26144BA33830"; // Adresse de déploiement
     export const VOTING_ABI = [
       // Copie ici l'ABI de ton contrat depuis le fichier build/contracts/Voting.json généré par Truffle.
     ];
     ```

4. Lancer Ganache :
   - Assure-toi que Ganache est en cours d'exécution.
   - Vérifie que l'URL RPC est bien `http://127.0.0.1:8545`.

5. Démarre l'application React :
   ```bash
   npm start
   ```

6. Ouvre ton navigateur sur [http://localhost:3000](http://localhost:3000).

---

## **Fonctionnalités**
- **Connexion au portefeuille :** Connecte un portefeuille Ethereum via MetaMask.
- **Créer une élection :** Crée une nouvelle élection avec un titre et des candidats.
- **Voter pour un candidat :** Vote pour le candidat de ton choix.
- **Recharger les données :** Met à jour l'état de l'élection et des votes en temps réel.
- **Clôturer une élection :** Clôture une élection pour empêcher de nouveaux votes.

---

## **Structure du projet**
- **`src/App.js`** : Composant principal de l'application. Gère les interactions avec le contrat et l'affichage des données.
- **`src/config.js`** : Contient l'adresse et l'ABI du contrat.
- **`public/`** : Contient les fichiers statiques pour le projet React.
- **`package.json`** : Liste les dépendances du projet.

---

## **Exemple d'utilisation**
### 1. **Connecter MetaMask**
   - Clique sur **"Connecter le portefeuille"** pour lier MetaMask à l'application.
   - Assure-toi que MetaMask est configuré pour le réseau local **Ganache**.

### 2. **Créer une élection**
   - Clique sur **"Créer une élection"**.
   - Une transaction s'ouvrira dans MetaMask. Confirme-la.
   - Une fois confirmée, l'élection et les candidats seront affichés.

### 3. **Voter**
   - Pour voter, clique sur le bouton **"Voter"** à côté d'un candidat.
   - Confirme la transaction dans MetaMask.

### 4. **Clôturer l'élection**
   - Clique sur **"Clôturer l'élection"** pour empêcher d'autres votes.

---

## **Déploiement**
Pour déployer le frontend sur un hébergeur :
1. Construis l'application React :
   ```bash
   npm run build
   ```
2. Déploie les fichiers dans le dossier `build/` sur un service comme **Netlify**, **Vercel** ou tout autre hébergeur de ton choix.

---

## **Problèmes courants**
### 1. MetaMask affiche "Frais de gaz insuffisants"
   - Assure-toi que tu es sur le réseau Ganache et que le compte utilisé dans MetaMask a suffisamment d'ETH fictif.
   - Si nécessaire, importe un compte Ganache dans MetaMask.

### 2. L'élection ou les votes ne s'affichent pas
   - Vérifie que Ganache est en cours d'exécution.
   - Assure-toi que l'adresse du contrat dans `config.js` correspond à celle utilisée lors du déploiement.

### 3. Erreur de connexion au portefeuille
   - Assure-toi que MetaMask est installé et configuré sur le réseau local Ganache.

---

## **Technologies utilisées**
- **React.js** : Frontend de l'application.
- **Ethers.js** : Bibliothèque pour interagir avec Ethereum.
- **Truffle** : Framework pour le déploiement des smart contracts.
- **Ganache** : Simulateur de blockchain local.
- **MetaMask** : Extension de navigateur pour interagir avec Ethereum.

---

Si tu rencontres des problèmes ou as des questions, n'hésite pas à demander ! 🚀