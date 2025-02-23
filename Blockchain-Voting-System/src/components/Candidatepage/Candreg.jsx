import React, { useState, useContext } from "react";
import { VotingContext } from "../../context/VotingContext";
import "./Candregstyle.css";
import CandidateCard from "../Candidatepreviewcard/Candidateprev";
import { ethers } from "ethers";
// import { ethers } from "ethers/dist/ethers.umd.min.js";


function Candreg() {
    const [submittedCandidate, setSubmittedCandidate] = useState(null);
  const { addCandidate } = useContext(VotingContext);
  const [candidate, setCandidate] = useState({
    name: "",
    address: "",
    politicalParty: "",
    image: "", // Store image as Base64
    voteCount: 0,
    walletAddress: "", // Store Ethereum wallet address
  });

  // Handle input changes
  const handleChange = (e) => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
  };

  // Handle image upload & convert to Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setCandidate({ ...candidate, image: reader.result });
      };
    }
  };

  // Function to connect to MetaMask and get the user's wallet address
const connectMetaMask = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is required to register candidates!");
        return null;
      }
  
      // Request user to connect their wallet
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
  
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      console.log("Connected Wallet Address:", userAddress);
  
      return userAddress;
    } catch (error) {
      console.error("MetaMask connection failed:", error);
      alert("Failed to connect MetaMask. Please try again.");
      return null;
    }
  };

  
  // Create Ethereum Wallet
  const createEthereumWallet = async () => {
    try {
      console.log("Checking if MetaMask is available...");
      
      if (typeof window.ethereum === "undefined") {
        alert("MetaMask is required! Please install it.");
        return null;
      }
  
      console.log("MetaMask found, requesting accounts...");
      
      // Request wallet connection
      await window.ethereum.request({ method: "eth_requestAccounts" });
  
      console.log("Accounts requested, creating provider...");
      
      // Create provider correctly
      const provider = new ethers.BrowserProvider(window.ethereum); // Updated from Web3Provider
  
      console.log("Provider created, getting signer...");
      
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();
  
      console.log("Connected Wallet Address:", walletAddress);
      return walletAddress;
    } catch (error) {
      console.error("Error creating wallet:", error);
      return null;
    }
  };
  
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (candidate.name && candidate.address && candidate.politicalParty && candidate.image) {
        const walletAddress = await createEthereumWallet();
        if (!walletAddress) return;
  
        const newCandidate = { ...candidate, walletAddress };
      addCandidate(newCandidate); // Add candidate to context & local storage
      alert("Candidate Registered Successfully!");
        setSubmittedCandidate(newCandidate);
      // Reset form fields
      setCandidate({
        name: "",
        address: "",
        politicalParty: "",
        image: "",
        voteCount: 0,
        walletAddress: "",
      });
    } else {
      alert("Please fill in all fields and upload an image.");
    }
  };

  return (
    <div className="candidate-registration">
      <h2>Candidate Registration</h2>
      <div className="form-container">
        {/* Image Upload */}
        <div className="image-upload">
          <label htmlFor="file-upload" className="upload-box">
            Upload Image
          </label>
          <input type="file" id="file-upload" accept="image/*" onChange={handleImageUpload} hidden />
          {candidate.image && <img src={candidate.image}  alt="Preview" className="preview-img" />}
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-elements">
            <label>Full Name</label>
            <input type="text" name="name" value={candidate.name} onChange={handleChange} required />
          </div>
          <div className="form-elements">
            <label>Address</label>
            <input type="text" name="address" value={candidate.address} onChange={handleChange} required />
          </div>
          <div className="form-elements">
            <label>Political Party</label>
            <input type="text" name="politicalParty" value={candidate.politicalParty} onChange={handleChange} required />
          </div>
          <button type="submit" className="authorize-button" >Authorize Candidate</button>
        </form>
      </div>
      
    </div>
  );
}

export default Candreg;
