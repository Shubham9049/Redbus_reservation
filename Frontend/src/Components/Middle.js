import React from "react";
import "../Components/Middle.css";
import bus from "../Images/box1.png";
import people from "../Images/box2.png";
import ticket from "../Images/box3.jpg";
import { FaStar } from "react-icons/fa";

function Middle() {
  return (
    <>
      <div className="middle">
        <h1>India's No. 1 Online Bus Ticket Booking Site</h1>
        <div className="container">
          <div>
            <img src={bus} alt="" />
            <h2>2000+</h2>
            <p>Bus Collection</p>
          </div>
          <div>
            <img src={people} alt="" />
            <h2>20 Million</h2>
            <p>happy coustomer globaly</p>
          </div>
          <div>
            <img src={ticket} alt="" />
            <h2>5000+</h2>
            <p>ticket book everyday</p>
          </div>
        </div>
        <h1>Here's what a few of our customers br have to say about us</h1>
        <div className="ratings">
          <div>
            <div className="client">
              <div>
                <h1>V</h1>
              </div>
              <h3>
                Vishal Agarwal<p>coustomer since2020</p>
              </h3>
            </div>
            <span>
              <FaStar />
              4.5
            </span>
            <p>Awesome travel experiance with reserve Excellent staff</p>
          </div>
          <div>
            <div className="client">
              <div>
                <h1>C</h1>
              </div>
              <h3>
                Chirag Sharma<p>coustomer since2020</p>
              </h3>
            </div>
            <span>
              <FaStar />
              4.5
            </span>
            <p>Awesome travel experiance with reserve Excellent staff</p>
          </div>
          <div>
            <div className="client">
              <div>
                <h1>S</h1>
              </div>
              <h3>
                Seema Agarwal<p>coustomer since2020</p>
              </h3>
            </div>
            <span>
              <FaStar />
              4.5
            </span>
            <p>Awesome travel experiance with reserve Excellent staff</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Middle;
