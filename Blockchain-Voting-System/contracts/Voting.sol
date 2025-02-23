// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Voting {
    struct Candidate {
        string name;
        address candidateAddress;
        uint256 voteCount;
    }

    mapping(address => bool) public voters;
    Candidate[] public candidates;

    event Voted(address indexed voter, address indexed candidate);

    function addCandidate(string memory _name, address _candidateAddress) public {
        candidates.push(Candidate(_name, _candidateAddress, 0));
    }

    function vote(address _candidateAddress) public {
        require(!voters[msg.sender], "You have already voted!");

        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].candidateAddress == _candidateAddress) {
                candidates[i].voteCount++;
                voters[msg.sender] = true;
                emit Voted(msg.sender, _candidateAddress);
                return;
            }
        }
        revert("Candidate not found!");
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }
}
