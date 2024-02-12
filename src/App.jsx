
// import './App.css'
import StateGrid from './components/StateBox'

// function App() {


//   return (
//     <>
//       <StateGrid />
//     </>
//   )
// }

// export default App

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import StateGrid from './StateGrid';
import StateDetail from './components/StateDetail'; // Assuming you have a component for state details
import NavBar from './components/NavBar';

function App() {
  if (window.pieChartInstance) {
    window.pieChartInstance.destroy();
  }
  return (
    <div>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<StateGrid />} />
          <Route path="/state/:name" element={< StateDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
