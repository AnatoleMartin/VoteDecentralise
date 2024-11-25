const Voting = artifacts.require("Voting");

contract("Voting", (accounts) => {
  it("Should create an election", async () => {
    const voting = await Voting.deployed();
    await voting.createElection("Test Election", ["Alice", "Bob"]);

    const election = await voting.election();
    assert.equal(election.title, "Test Election");
  });

  it("Should allow voting", async () => {
    const voting = await Voting.deployed();

    // Créer une élection
    await voting.createElection("Test Election", ["Alice", "Bob"]);

    // Voter pour Alice (index 0)
    await voting.vote(0, { from: accounts[0] });

    // Vérifier les votes pour Alice
    const candidate = await voting.getCandidate(0); // Utilise la nouvelle fonction
    assert.equal(candidate[1].toNumber(), 1, "Vote count for Alice should be 1");
  });

  it("Should get the correct number of candidates", async () => {
    const voting = await Voting.deployed();

    // Vérifie le nombre total de candidats
    const count = await voting.getCandidateCount();
    assert.equal(count.toNumber(), 2, "Number of candidates should be 2");
  });
});
