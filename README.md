# VoteDecentralise

## Dossiers principaux :
### 1. artifacts/

Ce dossier contient les artefacts générés par Truffle après la compilation de tes contrats. Un artefact est un fichier JSON qui inclut :
- L'ABI (Application Binary Interface) du contrat.
- Le bytecode du contrat compilé.
- D'autres informations nécessaires pour interagir avec le contrat depuis le frontend ou les tests.

Il est automatiquement mis à jour à chaque recompilation de tes contrats.

### 2.build/
C'est le dossier principal contenant les résultats de la compilation.
Les fichiers ici sont utilisés pour déployer tes contrats et interagir avec eux via des outils comme Web3 ou Ethers.js.
Par défaut, il contient également un sous-dossier contracts/ avec une copie des artefacts.

### 3. cache/
Ce dossier est utilisé par Truffle pour stocker des données temporaires liées à la compilation ou au déploiement.
Il accélère les processus de recompilation en évitant de tout refaire si rien n'a changé.

### 4. contracts/
C'est ici que se trouvent tes contrats Solidity.
Tout fichier .sol ajouté dans ce dossier sera automatiquement pris en compte lors de la compilation.
Exemple : Ton fichier Voting.sol se trouve dans ce dossier.

### 5. migrations/
Ce dossier contient les scripts de déploiement (appelés "migrations") pour tes contrats.
Les fichiers ici sont exécutés par Truffle pour déployer ou mettre à jour tes contrats sur une blockchain.
Exemple : Ton fichier 2_deploy_voting.js s'assure que le contrat Voting est correctement déployé.

### 6. scripts/
Ce dossier est destiné aux scripts personnalisés que tu souhaites créer pour automatiser certaines tâches.
Par exemple, tu peux y ajouter des scripts pour interagir avec ton contrat (créer une élection, récupérer des résultats, etc.) sans passer par la console.

### 7. test/
Ce dossier contient tes fichiers de tests.
Les fichiers .js ici utilisent des frameworks comme Mocha ou Chai pour vérifier que tes contrats fonctionnent comme prévu.
Exemple : Tu as un fichier Voting.test.js qui vérifie la création d'une élection, le vote, etc.

### 8. typechain-types/
Ce dossier est généré automatiquement si tu utilises Typechain, un outil qui crée des définitions TypeScript pour tes contrats Solidity.
Cela facilite le développement dans TypeScript en offrant des types stricts pour interagir avec tes contrats.
Si tu n'as pas besoin de TypeScript, tu peux ignorer ce dossier.


## Fichiers importants :
### 1. .gitignore
Contient une liste des fichiers ou dossiers à exclure de ton dépôt Git. Par exemple :
node_modules/ pour éviter d'inclure les dépendances téléchargées.
build/ car il peut être régénéré.
### 2. package.json
Fichier de configuration Node.js. Il contient :
Les dépendances nécessaires à ton projet (comme Truffle, Web3, etc.).
Les scripts npm que tu peux exécuter, comme npm run test.

### 3. README.md
Un fichier texte utilisé pour décrire ton projet, son objectif, et les instructions pour l'installer ou l'utiliser.
Idéal pour expliquer ton projet à d'autres développeurs ou utilisateurs.

### 4. truffle-config.js
Le fichier de configuration principal pour Truffle.
C'est ici que tu spécifies :
Les réseaux (localhost, testnets comme Rinkeby, mainnet).
La version de Solidity.
Les plugins ou outils supplémentaires (comme Truffle Dashboard).

### 5. tsconfig.json
Si tu utilises TypeScript, ce fichier configure les options du compilateur TypeScript.
Exemple : Il peut définir où les fichiers compilés seront placés, quels modules importer, etc.
Si ton projet n'utilise pas activement TypeScript, ce fichier n'est pas nécessaire.


## Résumé général :
contracts/ : Tes contrats Solidity.

migrations/ : Scripts de déploiement pour tes contrats.

test/ : Tests automatisés pour vérifier le bon fonctionnement de tes contrats.

build/ et artifacts/ : Contiennent les fichiers 
compilés nécessaires pour interagir avec tes contrats.

truffle-config.js : Configuration pour déployer et tester tes contrats sur différents réseaux.



## 📜 **Description**
VoteDecentralise est une application basée sur la blockchain qui permet de créer et de gérer des élections décentralisées. Les utilisateurs peuvent :
- Créer une élection avec un titre et une liste de candidats.
- Voter pour les candidats de leur choix.
- Consulter les résultats après la clôture de l'élection.

Le projet utilise **Truffle** pour le déploiement et les tests, et il est compatible avec un réseau local simulé via **Ganache**.

---

## 🚀 **Fonctionnalités**
1. **Création d'élections** : Crée une élection avec un titre et plusieurs candidats.
2. **Système de vote sécurisé** :
   - Un utilisateur ne peut voter qu'une seule fois.
   - Les votes sont stockés de manière immuable sur la blockchain.
3. **Clôture des élections** : Une fois l'élection terminée, les votes ne peuvent plus être modifiés.
4. **Consultation des résultats** :
   - Affiche le nombre total de votes reçus par chaque candidat.
   - Fournit le nombre total de candidats.

---

## 🛠️ **Technologies utilisées**
- **Solidity** : Langage pour le contrat intelligent.
- **Truffle** : Framework de développement pour la blockchain Ethereum.
- **Ganache** : Blockchain locale pour le développement et les tests.
- **JavaScript** : Scripts de tests et interaction avec le contrat.
- **Node.js & npm** : Gestion des dépendances et outils de développement.

---

## 📂 **Structure du projet**

```plaintext
VoteDecentralise/
├── contracts/                # Contrats Solidity
│   ├── Voting.sol            # Contrat intelligent principal
├── migrations/               # Scripts de déploiement Truffle
│   ├── 1_initial_migration.js
│   ├── 2_deploy_voting.js    # Script de déploiement pour Voting.sol
├── test/                     # Scripts de tests
│   ├── Voting.test.js        # Tests unitaires du contrat Voting
├── scripts/                  # Scripts d'interaction avec le contrat
├── build/                    # Artéfacts générés par la compilation
├── truffle-config.js         # Configuration du réseau et de Truffle
├── README.md                 # Documentation du projet
├── package.json              # Dépendances npm
└── .gitignore                # Fichiers à ignorer par Git
```

---

## ⚙️ **Installation et configuration**

### **Prérequis**
- [Node.js](https://nodejs.org/) (version 16 ou supérieure)
- [Truffle](https://trufflesuite.com/docs/) installé globalement :
  ```bash
  npm install -g truffle
  ```
- [Ganache](https://trufflesuite.com/ganache/) (GUI ou CLI)

### **Étapes d'installation**
1. Clone le dépôt :
   ```bash
   git clone <URL-DU-DEPOT>
   cd VoteDecentralise
   ```

2. Installe les dépendances npm :
   ```bash
   npm install
   ```

3. Démarre une blockchain locale avec Ganache :
   ```bash
   ganache
   ```

4. Compile les contrats :
   ```bash
   truffle compile
   ```

5. Déploie les contrats sur le réseau de développement :
   ```bash
   truffle migrate --reset
   ```

---

## 🧪 **Tester le contrat**
Pour exécuter les tests unitaires, utilise la commande suivante :
```bash
truffle test
```

---

## 💻 **Interagir avec le contrat**
### **Via Truffle Console**
1. Lance la console Truffle :
   ```bash
   truffle console
   ```

2. Crée une élection :
   ```javascript
   const voting = await Voting.deployed();
   await voting.createElection("Presidentielle", ["Macron", "Lepen", "Melenchon"]);
   ```

3. Vote pour un candidat :
   ```javascript
   const accounts = await web3.eth.getAccounts();
   await voting.vote(0, { from: accounts[0] });
   ```

4. Consulte les résultats :
   ```javascript
   const results = [];
   const count = await voting.getCandidateCount();
   for (let i = 0; i < count; i++) {
     const candidate = await voting.getCandidate(i);
     results.push({ name: candidate[0], votes: candidate[1].toNumber() });
   }
   console.log(results);
   ```

---
