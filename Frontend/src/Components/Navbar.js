import React from 'react'
import "../Components/Navbar.css"
import logo from "../Images/logo.png"

function Navbar() {
  return (
    <nav>
     <div className="tags">
     <div className="logo">
     <img src={logo} alt="" />
     <p>RESERVE</p>
     </div>
    <div className="nav-links">
    <ul>
        <li><a href="/#">Ticket</a></li>
        <li><a href="/#">Contact us</a></li>
      </ul>
    </div>
     </div>
      <div className="btn">
        <button>Login</button>
        <button>Register</button>
      </div>
    </nav>
  )
}

export default Navbar
