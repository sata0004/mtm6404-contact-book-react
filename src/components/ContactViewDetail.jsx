import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import db from '../db';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';

const ContactDetailPage = () => {
  const { id } = useParams();
  const [contactInfo, setContactInfo] = useState(null);
  const navigate = useNavigate();

  // Load contact details
  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const contactRef = doc(db, 'contacts', id);
        const contactDoc = await getDoc(contactRef);
        if (contactDoc.exists()) {
          setContactInfo({ id: contactDoc.id, ...contactDoc.data() });
        } else {
          alert('Contact not found.');
          navigate('/');
        }
      } catch (error) {
        alert('❌ Error loading contact: ' + error.message);
      }
    };
    loadContactInfo();
  }, [id, navigate]);

  // Delete contact
  const removeContact = async () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteDoc(doc(db, 'contacts', id));
        navigate('/');
      } catch (error) {
        alert('❌ Error deleting contact: ' + error.message);
      }
    }
  };

  if (!contactInfo) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          
          {/* Header */}
          <h2
            className="mb-4 text-center fw-bold text-white p-3 rounded shadow-sm"
            style={{
              background: 'linear-gradient(90deg, #16a085, #27ae60)'
            }}
          >
            📄 Contact Details
          </h2>

          {/* Contact Card */}
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h4 className="card-title fw-bold mb-3">
                {contactInfo.firstName} {contactInfo.lastName}
              </h4>
              <p className="card-text mb-4">
                <strong>Email:</strong> {contactInfo.email}
              </p>

              <div className="d-flex flex-wrap gap-2">
                <Link to={`/update/${contactInfo.id}`} className="btn btn-primary shadow-sm">
                  ✏️ Edit Contact
                </Link>
                <button onClick={removeContact} className="btn btn-danger shadow-sm">
                  🗑️ Delete Contact
                </button>
                <Link to="/" className="btn btn-secondary shadow-sm">
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactDetailPage;
