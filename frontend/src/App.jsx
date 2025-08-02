import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AllStudents from './components/AllStudents';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent'; // Import the new component
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<AllStudents />} />
            <Route path="/add" element={<AddStudent />} />
            <Route path="/edit/:id" element={<EditStudent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;