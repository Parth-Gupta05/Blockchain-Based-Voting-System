import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'
// import '../assets/QuadrantLogo.png'
function Header() {
  return (
    <div className='header'>
      <div className='header__logo'><Link to="/" className='header__logo' style={{textDecoration:"none"}}><div className='img'></div>Quadrant</Link></div>
      <div className='header_nav'>
      <Link  to="/voter-registration" className="header_nav_item"><div >Voter Registration</div></Link>
      <Link to="/candidate-registration" className="header_nav_item"><div >Candidate Registration</div></Link>
        
        
        <button className='wallet-connect'>Connect Wallet</button>
      </div>
    </div>
  )
}

export default Header
