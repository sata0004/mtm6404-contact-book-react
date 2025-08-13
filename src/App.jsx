import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Contacts from './components/Contacts';
import ContactViewDetail from './components/ContactViewDetail';
import CreateContact from './components/AddContact';
import UpdateContact from './components/UpdateContact';
import 'bootstrap/dist/css/bootstrap.min.css';

function ContactManagerApp() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container justify-content-center">
          <div className="navbar-nav">
            <Link to="/" className="nav-link px-3 fw-bold text-light">Home</Link>
            <Link to="/add" className="nav-link px-3 fw-bold text-light">Add Contact</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/view/:id" element={<ContactViewDetail />} />
        <Route path="/add" element={<CreateContact />} />
        <Route path="/update/:id" element={<UpdateContact />} />
      </Routes>
    </div>
  );
}

export default ContactManagerApp;
