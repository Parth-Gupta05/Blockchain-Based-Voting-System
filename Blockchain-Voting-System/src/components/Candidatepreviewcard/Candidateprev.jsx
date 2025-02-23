import React from "react";
import "./Candidateprevstyle.css";

const CandidateCard = ({ name, address, politicalParty, image, onVote, candidate }) => {
  return (
    <div className="card">
      <div className="upload-section">
        {image ? (
          <img src={image} alt="Candidate" className="preview-img" />
        ) : (
          <div className="imgplaceholder">No Image</div>
        )}
      </div>
      <div className="form-section">
        <h3>{name}</h3>
        {/* <p>{address}</p> */}
        <p>{politicalParty}</p>
        <p>{candidate.voteCount}</p>

      </div>
      <button className="vote-btn" onClick={() => onVote(candidate.name)}>Vote</button>
    </div>
  );
};

export default CandidateCard;
