import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { VOTING_ABI, VOTING_ADDRESS } from "./config";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [electionTitle, setElectionTitle] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask n'est pas installé !");
      return;
    }
    try {
      // Demande la connexion au portefeuille
      await window.ethereum.request({ method: "eth_requestAccounts" });
      alert("Portefeuille connecté !");
    } catch (err) {
      console.error("Erreur de connexion au portefeuille :", err);
    }
  };

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (!window.ethereum) {
        alert(
          "Veuillez installer MetaMask pour interagir avec cette application !"
        );
        return;
      }

      try {
        // Demande la connexion si elle n'a pas encore été faite
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length === 0) {
          alert("Veuillez connecter votre portefeuille !");
          return;
        }

        // Configure ethers.js
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          VOTING_ADDRESS,
          VOTING_ABI,
          signer
        );

        setProvider(provider);
        setSigner(signer);
        setContract(contract);

        // Charger les informations de l'élection
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
        console.error(
          "Erreur lors du chargement des données blockchain :",
          err
        );
      }
    };

    loadBlockchainData();
  }, []);

  const vote = async (index) => {
    try {
      setLoading(true);
      const tx = await contract.vote(index);
      await tx.wait();
      alert("Vote enregistré !");
    } catch (err) {
      console.error("Erreur lors du vote :", err);
      alert(`Erreur lors du vote : ${err.reason || "Une erreur s'est produite."}`);
    } finally {
      setLoading(false);
    }
  };
  

  const createElection = async () => {
    try {
      const title = prompt("Titre de l'élection :");
      const candidateNames = prompt(
        "Candidats (séparés par des virgules) :"
      ).split(",");
      const tx = await contract.createElection(title, candidateNames);
      await tx.wait();
      alert("Élection créée !");
      setElectionTitle(title); // Met à jour le titre dans l'état
      setCandidates(candidateNames.map((name) => ({ name, votes: 0 }))); // Réinitialise les candidats
    } catch (err) {
      console.error("Erreur lors de la création de l'élection :", err);
      alert("Impossible de créer l'élection.");
    }
  };

  const closeElection = async () => {
    try {
      const tx = await contract.closeElection();
      await tx.wait();
      alert("Élection clôturée !");
    } catch (err) {
      console.error("Erreur lors de la clôture de l'élection :", err);
      alert("Impossible de clôturer l'élection.");
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
      alert("Données de l'élection rechargées !");
    } catch (err) {
      console.error("Erreur lors du rechargement des données :", err);
      alert("Impossible de recharger les données.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>VoteDecentralise</h1>
      <button onClick={connectWallet}>Connecter le portefeuille</button>
      <button onClick={createElection}>Créer une élection</button>
      <button onClick={closeElection} disabled={!electionTitle}>
        Clôturer l'élection
      </button>
      <button onClick={loadElectionData}>
        Recharger les données de l'élection
      </button>

      <h2>Élection : {electionTitle || "Aucune élection en cours"}</h2>
      {candidates.length > 0 ? (
        <ul>
          {candidates.map((candidate, index) => (
            <li key={index}>
              {candidate.name} - {candidate.votes} votes
              <button
                onClick={() => vote(index)}
                disabled={loading}
                style={{ marginLeft: "10px" }}
              >
                Voter
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Chargement des candidats...</p>
      )}
    </div>
  );
}

export default App;
