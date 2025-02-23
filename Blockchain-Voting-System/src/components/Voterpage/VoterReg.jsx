import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { VotingContext } from "../../context/VotingContext";
// import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const SECRET_KEY = "your-secret-key"; // Use a strong secret key

import "./Voterregstyle.css";

function VoterReg() {
    const navigate = useNavigate(); // Initialize navigation
    const { addVoter } = useContext(VotingContext);
    
    const [voter, setVoter] = useState({
        name: "",
        voterId: "",  // Changed "address" to "voterId"
        image: "",
    });

    // Handle input change
    const handleChange = (e) => {
        setVoter({ ...voter, [e.target.name]: e.target.value });
    };

    const encryptVoterId = (voterId) => {
        return CryptoJS.AES.encrypt(voterId, SECRET_KEY).toString();
      };

    // Handle Image Upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setVoter({ ...voter, image: reader.result });
            };
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(voter);
        if (voter.name && voter.voterId) { // Changed "address" to "voterId"
            addVoter(voter); // Save voter to context/local storage
            alert("Voter Registered Successfully!");
            // Encrypt voterId before passing to URL
            const encryptedVoterId = encodeURIComponent(encryptVoterId(voter.voterId));

            // Redirect to home with encrypted voter ID
            navigate(`/?voterId=${encryptedVoterId}`);
             // Redirect to Home Page
        } else {
            alert("Please fill in all fields.");
        }
    };

    return (
        <div className="voter-registration">
            <h2>Voter Registration</h2>
            <div className="voter-form-container">
                {/* Image Upload Section */}
                <div className="image-preview">
                    <label htmlFor="file-upload" className="upload-box">
                        {voter.image ? (
                            <img src={voter.image} alt="Preview" className="preview-img" />
                        ) : (
                            "Upload Image"
                        )}
                    </label>
                    <input type="file" id="file-upload" accept="image/*" onChange={handleImageUpload} hidden />
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit}>
                    <div className="form-elements">
                        <label>Full Name:</label>
                        <input type="text" name="name" value={voter.name} onChange={handleChange} required />
                    </div>
                    <div className="form-elements">
                        <label>Voter ID:</label> {/* Changed label from Address to Voter ID */}
                        <input type="text" name="voterId" value={voter.voterId} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="register-button">Register Voter</button>
                </form>
            </div>
        </div>
    );
}

export default VoterReg;
