import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { VOTING_ABI, VOTING_ADDRESS } from "./config";
import Swal from "sweetalert2";
import './App.css';

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [electionTitle, setElectionTitle] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      Swal.fire("Erreur", "MetaMask n'est pas installé !", "error");
      return;
    }
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      Swal.fire("Succès", "Portefeuille connecté !", "success");
    } catch (err) {
      console.error("Erreur de connexion au portefeuille :", err);
      Swal.fire("Erreur", "Connexion échouée !", "error");
    }
  };

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (!window.ethereum) {
        Swal.fire(
          "Erreur",
          "Veuillez installer MetaMask pour interagir avec cette application !",
          "error"
        );
        return;
      }

      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length === 0) {
          Swal.fire("Erreur", "Veuillez connecter votre portefeuille !", "error");
          return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(VOTING_ADDRESS, VOTING_ABI, signer);

        setProvider(provider);
        setSigner(signer);
        setContract(contract);

        const election = await contract.election();
        setElectionTitle(election.title);

        const count = await contract.getCandidateCount();
        const candidatesList = [];
        for (let i = 0; i < count; i++) {
          const candidate = await contract.getCandidate(i);
          candidatesList.push({
            name: candidate[0],
            votes: candidate[1].toNumber(),
          });
        }
        setCandidates(candidatesList);
      } catch (err) {
        console.error("Erreur lors du chargement des données blockchain :", err);
        Swal.fire("Erreur", "Impossible de charger les données blockchain.", "error");
      }
    };

    loadBlockchainData();
  }, []);

  const vote = async (index) => {
    try {
      setLoading(true);
      const tx = await contract.vote(index);
      await tx.wait();
      Swal.fire("Succès", "Vote enregistré avec succès !", "success");
    } catch (err) {
      console.error("Erreur lors du vote :", err);
      Swal.fire("Erreur", "Impossible d'enregistrer le vote.", "error");
    } finally {
      setLoading(false);
    }
  };

  const createElection = async () => {
    try {
      const { value: title } = await Swal.fire({
        title: "Titre de l'élection",
        input: "text",
        inputPlaceholder: "Entrez le titre de l'élection",
        showCancelButton: true,
      });
  
      if (!title) {
        Swal.fire("Info", "Création annulée.", "info");
        return;
      }
  
      let candidates = [];
      let addMore = true;
  
      while (addMore) {
        const { value: candidateData } = await Swal.fire({
          title: "Ajouter un candidat",
          html: `
            <div class="form-group">
              <div class="form-group">
              <label for="name">Nom du candidat</label>
              <input id="name" type="text" class="swal2-input" placeholder="Nom du candidat">
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea id="description" class="swal2-textarea" placeholder="Description"></textarea>
            </div>
          `,
          focusConfirm: false,
          showCancelButton: true,
          preConfirm: () => {
            const name = document.getElementById('name').value.trim();
            const description = document.getElementById('description').value.trim();
            const photo = document.getElementById('photo').value.trim();
  
            if (!name || !description || !photo) {
              Swal.showValidationMessage('Veuillez remplir tous les champs.');
              return false;
            }
  
            return { name, description, photo };
          }
        });
  
        if (candidateData) {
          candidates.push(candidateData);
          addMore = (await Swal.fire({
            title: "Ajouter un autre candidat ?",
            text: "Voulez-vous ajouter un autre candidat ?",
            showCancelButton: true,
            confirmButtonText: "Oui",
            cancelButtonText: "Non",
          })).isConfirmed;
        } else {
          Swal.fire("Erreur", "Le candidat doit avoir un nom, une description et une photo.", "error");
        }
      }
  
      if (candidates.length === 0) {
        Swal.fire("Erreur", "Vous devez entrer au moins un candidat.", "error");
        return;
      }
  
      const tx = await contract.createElection(title, candidates);
      await tx.wait();
      Swal.fire("Succès", "Élection créée avec succès !", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Erreur", "Impossible de créer l'élection.", "error");
    }
  };
  

  const closeElection = async () => {
    try {
      const tx = await contract.closeElection();
      await tx.wait();
      Swal.fire("Succès", "Élection clôturée avec succès !", "success");
    } catch (err) {
      console.error("Erreur lors de la clôture de l'élection :", err);
      Swal.fire("Erreur", "Impossible de clôturer l'élection.", "error");
    }
  };

  const loadElectionData = async () => {
    try {
      const election = await contract.election();
      setElectionTitle(election.title);

      const count = await contract.getCandidateCount();
      const candidatesList = [];
      for (let i = 0; i < count; i++) {
        const candidate = await contract.getCandidate(i);
        candidatesList.push({
          name: candidate[0],
          votes: candidate[1].toNumber(),
        });
      }
      setCandidates(candidatesList);
      Swal.fire("Succès", "Données de l'élection rechargées !", "success");
    } catch (err) {
      console.error("Erreur lors du rechargement des données :", err);
      Swal.fire("Erreur", "Impossible de recharger les données.", "error");
    }
  };

  return (
    <div>
      <header className="app-header">
        <h1>Vote</h1><h1 className="titre">Decentralise</h1>
        <nav className="header-link">
          <ul>
            <li><a href="" onClick={createElection}>Elections</a></li>
            <li><a href=""  onClick={connectWallet}>Connexion</a></li>
          </ul>
        </nav>
      </header>
      <div className="description">
        <p className="titre">Vote électronique</p>
        <p>La solution pour des élections équitables, transparentes et accessibles à tous</p>
      </div>
      <main>
        <h2 className="sous-titre">Nos fonctionnalités</h2>
        <div className="container">
          <div className="case">
            <p>Connectez votre portefeuille pour accéder à vos fonctionnalités sécurisées.</p>
            <button className="header-buttons" onClick={connectWallet}>Connecter le portefeuille</button>
          </div>
          <div className="case">
            <p>Créez une nouvelle élection pour organiser facilement la collecte des votes.</p> 
            <button className="header-buttons" onClick={createElection}>Créer une élection</button>
          </div>
          <div className="case">
            <p>Finalisez l'élection pour compter les votes et annoncer les résultats.</p>
            <button className="header-buttons" onClick={closeElection} disabled={!electionTitle}>Clôturer l'élection</button>
          </div>
          <div className="case">
            <p>Revenez à l'état initial pour rafraîchir les informations de l'élection.</p>
            <button className="header-buttons" onClick={loadElectionData}>Recharger les données</button>
          </div>
        </div>
        <h2>Élection : {electionTitle || "Aucune élection en cours"}</h2>
        {candidates.length > 0 ? (
          <ul>
            {candidates.map((candidate, index) => (
              <li key={index}>
                {candidate.name} - {candidate.votes} votes
                <button onClick={() => vote(index)} disabled={loading}>
                  Voter
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="loader"></p>
        )}
      </main>

      <footer className="footer">
        <div className="column1">
          <h1>Vote</h1><h1 className="titre">Decentralise</h1>
        </div>
        <div className="column2">
          <p>Développé par : </p>
          <a href="https://github.com/AnatoleMartin/VoteDecentralise">Tom, Jules, Anatole et Maxence</a>
        </div>
      </footer>
    </div>

  );
  
}

export default App;
