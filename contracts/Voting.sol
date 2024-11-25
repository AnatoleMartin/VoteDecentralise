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
        mapping(address => bool) voters;
        bool isActive;
    }

    Election public election;

    // Créer une nouvelle élection
    function createElection(
        string memory _title,
        string[] memory _candidateNames
    ) public {
        election.title = _title;
        delete election.candidates; // Réinitialiser les candidats pour une nouvelle élection
        for (uint i = 0; i < _candidateNames.length; i++) {
            election.candidates.push(
                Candidate({name: _candidateNames[i], voteCount: 0})
            );
        }
        election.isActive = true;
    }

    // Voter pour un candidat
    function vote(uint candidateIndex) public {
        require(election.isActive, "Election is not active");
        require(!election.voters[msg.sender], "You have already voted");
        require(
            candidateIndex < election.candidates.length,
            "Invalid candidate"
        );

        election.candidates[candidateIndex].voteCount += 1;
        election.voters[msg.sender] = true;
    }

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
