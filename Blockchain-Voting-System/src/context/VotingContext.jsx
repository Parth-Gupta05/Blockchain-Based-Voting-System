import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
// Create Context
export const VotingContext = createContext();

// Context Provider Componen
export const VotingProvider = ({ children }) => {
  // Voters List (Array of Objects)
  const [voters, setVoters] = useState(() => {
    const storedVoters = localStorage.getItem("voters");
    return storedVoters
      ? JSON.parse(storedVoters)
      : [
          { name: "Alice Johnson", voterId: "V12345", voted: false },
          { name: "Bob Smith", voterId: "V67890", voted: true },
          { name: "Charlie Brown", voterId: "V11223", voted: false },
        ];
  });

  // Candidates List (Array of Objects)
  const [candidates, setCandidates] = useState(() => {
    const storedCandidates = localStorage.getItem("candidates");
    return storedCandidates
      ? JSON.parse(storedCandidates)
      : [
          { name: "John Doe", politicalParty: "Democratic Party", voteCount: 0 },
          { name: "Jane Roe", politicalParty: "Republican Party", voteCount: 0 },
          { name: "Mark Spencer", politicalParty: "Independent", voteCount: 0 },
        ];
  });

  useEffect(() => {
    localStorage.setItem("candidates", JSON.stringify(candidates));
  }, [candidates]);

  const addCandidate = (candidate) => {
    setCandidates([...candidates, candidate]);
    localStorage.setItem("candidates", JSON.stringify(candidates));
  };
  
  const addVoter = (newVoter) => {
    setVoters((prevVoters) => {
      const updatedVoters = [...prevVoters, newVoter];
      localStorage.setItem("voters", JSON.stringify(updatedVoters));
      return updatedVoters;
    });
  };

  const castVote = (voterId, candidateName) => {
    setVoters((prevVoters) => {
      return prevVoters.map((voter) =>
        voter.voterId === voterId ? { ...voter, voted: true } : voter
      );
    });

    setCandidates((prevCandidates) => {
      return prevCandidates.map((candidate) =>
        candidate.name === candidateName
          ? { ...candidate, voteCount: candidate.voteCount + 1 }
          : candidate
      );
    });
  };

  return (
    <VotingContext.Provider value={{ voters, setVoters, candidates, setCandidates, addCandidate, addVoter, castVote }}>
      {children}
    </VotingContext.Provider>
  );
};
