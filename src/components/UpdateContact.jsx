import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import db from '../db';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const EditContactPage = () => {
  const { id } = useParams();
  const [contactFirstName, setContactFirstName] = useState('');
  const [contactLastName, setContactLastName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const navigate = useNavigate();

  // Load contact details
  useEffect(() => {
    const loadContactDetails = async () => {
      try {
        const contactRef = doc(db, 'contacts', id);
        const contactDoc = await getDoc(contactRef);
        if (contactDoc.exists()) {
          const data = contactDoc.data();
          setContactFirstName(data.firstName);
          setContactLastName(data.lastName);
          setContactEmail(data.email);
        } else {
          alert('Contact not found.');
          navigate('/');
        }
      } catch (error) {
        alert('❌ Error loading contact: ' + error.message);
      }
    };
    loadContactDetails();
  }, [id, navigate]);

  // Update contact details
  const updateContact = async (e) => {
    e.preventDefault();
    try {
      const contactRef = doc(db, 'contacts', id);
      await updateDoc(contactRef, {
        firstName: contactFirstName,
        lastName: contactLastName,
        email: contactEmail
      });
      navigate(`/view/${id}`);
    } catch (error) {
      alert('❌ Error updating contact: ' + error.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          
          {/* Page Title */}
          <h2
            className="mb-4 text-center fw-bold text-white p-3 rounded shadow-sm"
            style={{
              background: 'linear-gradient(90deg, #8e44ad, #3498db)'
            }}
          >
            ✏️ Edit Contact
          </h2>

          {/* Edit Form */}
          <form
            onSubmit={updateContact}
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
                placeholder="Enter email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
              />
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary fw-semibold shadow-sm"
              >
                💾 Update Contact
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default EditContactPage;
