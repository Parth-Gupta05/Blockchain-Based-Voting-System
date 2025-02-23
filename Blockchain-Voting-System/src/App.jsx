import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header/Header'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Votes from './components/Votingpage/Votes';
import VoterReg from './components/Voterpage/VoterReg';
import Candreg from './components/Candidatepage/Candreg';
import { VotingProvider } from './context/VotingContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <VotingProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Votes />} />
          <Route path="/voter-registration" element={<VoterReg/>} />
          <Route path="/candidate-registration" element={<Candreg />} />
        </Routes>
      </Router>
    </VotingProvider>
  )
}

export default App
