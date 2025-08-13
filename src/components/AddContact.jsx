import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../db';
import { collection, addDoc } from 'firebase/firestore';

const AddContactPage = () => {
  const [contactFirstName, setContactFirstName] = useState('');
  const [contactLastName, setContactLastName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const navigate = useNavigate();

  const saveNewContact = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'contacts'), {
        firstName: contactFirstName,
        lastName: contactLastName,
        email: contactEmail
      });
      navigate(`/view/${docRef.id}`);
    } catch (error) {
      alert('❌ Error adding contact: ' + error.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* Header */}
          <h2
            className="mb-4 text-center fw-bold text-white p-3 rounded shadow-sm"
            style={{
              background: 'linear-gradient(90deg, #2c3e50, #4ca1af)'
            }}
          >
            ➕ Add  Contact
          </h2>

          {/* Form */}
          <form
            onSubmit={saveNewContact}
            className="p-4 border-0 rounded shadow-sm bg-light"
          >
            <div className="mb-3">
              <label className="form-label fw-semibold">First Name</label>
              <input
                type="text"
                className="form-control border-primary shadow-sm"
                placeholder="Enter first name"
                value={contactFirstName}
                onChange={(e) => setContactFirstName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Last Name</label>
              <input
                type="text"
                className="form-control border-primary shadow-sm"
                placeholder="Enter last name"
                value={contactLastName}
                onChange={(e) => setContactLastName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control border-primary shadow-sm"
                placeholder="Enter email address"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-success fw-semibold shadow-sm"
              >
                ✅ Save Contact
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContactPage;
