import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Navbar from '../src/Components/Navbar';
import Body from './Components/Body';

import Footer from './Components/Footer';
import BusPage from './Components/BusPage'; 
import SeatSelection from "./Components/SeatSelection";

function App() {
  return (
    <Router>
      <>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/bus/:fromLocation/:toLocation/:journeyDate" element={<BusPage />} />
          <Route path="/seat-selection/:busOwnerID/:date" element={<SeatSelection />} />
        </Routes>
       
        <Footer />
      </>
      </>
    </Router>
  );
}

export default App;
