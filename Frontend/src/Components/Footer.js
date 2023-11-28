import React from 'react'
import "../styles/footer.css"
import logo from "../Images/logo.png"
import { IoLogoInstagram } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
function footer() {
  return (
  <>
  <footer>
    <div className="box1">
     <div id="footer-logo">
     <img src={logo} alt="" />
     <p>RESERVE</p>
     </div>
     <p>When you have a choice.Choose Reserve</p>
     <p>Reserve offer bus tickets booking through its website,IOS,and androids <br /> 
     mobile apps for all majnoar cities</p>
     <a href="/#">shubham.rajveer19@gmail.com</a>
    </div>
    <div className="box2">
<div className="about">
  <h3>About Us</h3>
  <ul>
    <li><a href="/#">About Us</a></li>
    <li><a href="/#">Contact Us</a></li>
  </ul>
</div>
<div className="link">
<h3>Useful Link</h3>
  <ul>
    <li><a href="/#">Careers</a></li>
    <li><a href="/#">FAQ</a></li>
    <li><a href="/#">T&C</a></li>
    <li><a href="/#">Privacy Policy</a></li>
    <li><a href="/#">Blog</a></li>
  </ul>
</div>
<div className="follow">
<h3>Follow Us</h3>
<ul>
  <li><a href="www.instagram.com"><IoLogoInstagram /></a></li>
  <li><a href="www.facebook.com"><FaFacebook /></a></li>
  <li><a href="www.twitter.com"><BsTwitterX /></a></li>
</ul>
</div>
    </div>
  </footer>
  </>
  )
}

export default footer
