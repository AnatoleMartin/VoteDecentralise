Voici une version mise à jour du README pour le frontend :

---

# VoteDecentralise Frontend

Ce projet est le frontend d'une application de vote décentralisée. Il permet aux utilisateurs d'interagir avec un contrat intelligent Ethereum déployé sur un réseau local via une interface conviviale.

## Fonctionnalités

- Connecter un portefeuille Ethereum (MetaMask requis).
- Créer une élection avec un titre et des candidats.
- Voter pour des candidats.
- Clôturer une élection en cours.
- Recharger les données de l'élection en temps réel.

## Prérequis

- **Node.js** : Assurez-vous d'avoir Node.js installé (recommandé : version 16 ou supérieure).
- **Ganache** : Utilisé pour exécuter un réseau local Ethereum.
- **MetaMask** : Extension de navigateur pour interagir avec les DApps.

## Installation

1. Clonez le dépôt :

   ```bash
   git clone <url-du-repo>
   ```

2. Accédez au dossier du frontend :

   ```bash
   cd voting-frontend
   ```

3. Installez les dépendances :

   ```bash
   npm install
   ```

## Configuration

1. **Metamask :**
   - Configurez MetaMask pour se connecter à votre réseau Ganache local.
   - Ajoutez un réseau personnalisé dans MetaMask avec ces paramètres :
     - **Nom** : Ganache Local
     - **RPC URL** : `http://127.0.0.1:7545`
     - **ID du réseau** : Vérifiez dans Ganache (souvent `5777`).

2. **Adresse du contrat et ABI :**
   - Dans le fichier `src/config.js`, mettez à jour les valeurs suivantes avec celles générées lors du déploiement de votre contrat :
     ```javascript
     export const VOTING_ADDRESS = "ADRESSE_DU_CONTRAT";
     export const VOTING_ABI = [
       // Copiez-collez l'ABI du contrat ici
     ];
     ```

## Utilisation

1. **Démarrez Ganache :**

   Assurez-vous que Ganache est en cours d'exécution et que le contrat Voting est déployé sur ce réseau.

2. **Démarrez le frontend :**

   Depuis le dossier `voting-frontend`, exécutez :

   ```bash
   npm start
   ```

   L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

3. **Actions disponibles dans l'interface utilisateur :**
   - **Connecter le portefeuille** : Permet de connecter MetaMask à l'application.
   - **Créer une élection** : Définit une nouvelle élection avec un titre et des candidats.
   - **Clôturer l'élection** : Termine l'élection active.
   - **Recharger les données** : Recharge les informations sur l'élection et les votes.

## Structure du projet

- `src/App.js` : Composant principal React qui gère les interactions utilisateur et les connexions blockchain.
- `src/config.js` : Fichier contenant l'adresse du contrat et son ABI.
- `src/App.css` : Styles CSS pour une interface moderne et propre.

## Développement

Si vous modifiez le contrat intelligent ou le réseau, vous devrez :

1. Redéployer le contrat avec Truffle :
   ```bash
   truffle migrate --reset --network development
   ```

2. Mettre à jour l'adresse du contrat et l'ABI dans `src/config.js`.

3. Relancer le serveur React :
   ```bash
   npm start
   ```

## Exemple de fonctionnalités

### Création d'une élection
1. Cliquez sur "Créer une élection".
2. Entrez un titre et une liste de candidats dans les popups.
3. Une fois confirmée, l'élection s'affiche.

### Voter pour un candidat
1. Cliquez sur le bouton "Voter" à côté d'un candidat.
2. Confirmez la transaction dans MetaMask.
3. Le nombre de votes sera mis à jour une fois la transaction validée.

### Clôturer une élection
1. Cliquez sur "Clôturer l'élection".
2. L'élection sera marquée comme inactive et ne pourra plus recevoir de votes.

## Dépendances

- **React** : Framework JavaScript pour le frontend.
- **ethers.js** : Librairie pour interagir avec Ethereum.
- **MetaMask** : Extension de navigateur pour signer les transactions.

## Styles

L'application utilise un design minimaliste avec un fichier CSS (voir `src/App.css`) pour une meilleure lisibilité et une expérience utilisateur agréable.

---

Si tu veux d'autres sections ou des ajustements, dis-moi ! 😊