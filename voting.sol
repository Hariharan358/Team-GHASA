// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    // Define the candidate structure
    struct Candidate {
        uint id;
        string name;
        string party;
        string description;
        uint voteCount;
    }

    // Mapping from candidate ID to Candidate
    mapping(uint => Candidate) public candidates;
    // Mapping to track if an address has voted
    mapping(address => bool) public hasVoted;
    // The number of candidates
    uint public candidatesCount;
    // Owner of the contract
    address public owner;

    // Event to emit when a vote is cast
    event VoteCast(uint candidateId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Function to add a candidate
    function addCandidate(string memory _name, string memory _party, string memory _description) public onlyOwner {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _party, _description, 0);
    }

    // Function to vote for a candidate
    function vote(uint _candidateId) public {
        require(!hasVoted[msg.sender], "You have already voted.");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID.");

        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;

        emit VoteCast(_candidateId);
    }

    // Function to get candidate details
    function getCandidate(uint _candidateId) public view returns (string memory name, string memory party, string memory description, uint voteCount) {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID.");
        Candidate memory candidate = candidates[_candidateId];
        return (candidate.name, candidate.party, candidate.description, candidate.voteCount);
    }
}
