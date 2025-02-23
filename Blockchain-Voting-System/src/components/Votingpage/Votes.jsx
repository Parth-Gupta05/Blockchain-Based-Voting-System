// import React from 'react'
import React, { useState, useContext, useEffect } from "react";
import { VotingContext } from "../../context/VotingContext";
import "./Votesstyle.css";
import CandidateCard from "../Candidatepreviewcard/Candidateprev";
import { useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";
const SECRET_KEY = "your-secret-key";

function Votes() {
    const { voters, castVote, candidates } = useContext(VotingContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encryptedVoterId = queryParams.get("voterId");

  const [voterId, setVoterId] = useState("");

    const decryptVoterId = (encryptedText) => {
        try {
          const bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedText), SECRET_KEY);
          return bytes.toString(CryptoJS.enc.Utf8);
        } catch (error) {
          console.error("Error decrypting voter ID:", error);
          return "";
        }
      };

    useEffect(() => {
        if (encryptedVoterId) {
          const decryptedId = decryptVoterId(encryptedVoterId);
          setVoterId(decryptedId);
        }
      }, [encryptedVoterId]);

    const handleVote = (candidateName) => {
        const voter = voters.find((v) => v.voterId === voterId);
    
        if (!voter) {
          alert("Voter ID not found!");
          return;
        }
    
        if (voter.voted) {
          alert("You have already voted!");
          return;
        }
    
        castVote(voterId, candidateName);
        alert(`Vote casted for ${candidateName}`);
      };

  return (
    <div style={{color: 'white'}} className="votes-container">
        <h2>Voting area <img className="voteimg" src="https://cdn.iconscout.com/icon/free/png-256/free-vote-sign-1-537485.png"/></h2>
        <div className="candidates-container" >
             {candidates.map((candidate,index) => (
                <CandidateCard candidate={candidate} onVote={handleVote} key={index} name={candidate.name}  politicalParty={candidate.politicalParty} image={candidate.image} />
                
            ))}
        </div>
    </div>
  )
}

export default Votes

// <div key={candidate.name}>
{/* <h2>{candidate.name}</h2>
<p>{candidate.politicalParty}</p>
<p>{candidate.voteCount}</p>
</div> */}