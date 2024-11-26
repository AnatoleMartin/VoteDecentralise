// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    struct Election {
        string title;
        Candidate[] candidates;
        bool isActive;
    }

    Election public election;
    uint public electionId; // Identifiant unique pour chaque élection
    mapping(uint => mapping(address => bool)) public voters; // Associe electionId aux votants

    // Créer une nouvelle élection
    function createElection(
        string memory _title,
        string[] memory _candidateNames
    ) public {
        // Supprime complètement l'ancienne élection
        delete election;

        // Augmente l'identifiant de l'élection
        electionId++;

        // Configure les nouvelles données de l'élection
        election.title = _title;
        election.isActive = true;

        for (uint i = 0; i < _candidateNames.length; i++) {
            election.candidates.push(
                Candidate({name: _candidateNames[i], voteCount: 0})
            );
        }
    }

    // Voter pour un candidat
    function vote(uint candidateIndex) public {
        require(election.isActive, "Election is not active");
        require(
            !voters[electionId][msg.sender],
            "You have already voted in this election"
        );
        require(
            candidateIndex < election.candidates.length,
            "Invalid candidate"
        );

        // Logique de vote
        election.candidates[candidateIndex].voteCount += 1;
        voters[electionId][msg.sender] = true;

        emit Voted(msg.sender, candidateIndex);
    }

    event Voted(address voter, uint candidateIndex);

    // Clôturer l'élection
    function closeElection() public {
        require(election.isActive, "Election is already closed");
        election.isActive = false;
    }

    // Récupérer les résultats
    function getResults() public view returns (Candidate[] memory) {
        require(!election.isActive, "Election is still active");
        return election.candidates;
    }

    // Récupérer les détails d'un candidat par index
    function getCandidate(
        uint index
    ) public view returns (string memory name, uint voteCount) {
        require(index < election.candidates.length, "Candidate does not exist");
        Candidate storage candidate = election.candidates[index];
        return (candidate.name, candidate.voteCount);
    }

    // Obtenir le nombre total de candidats
    function getCandidateCount() public view returns (uint) {
        return election.candidates.length;
    }
}
