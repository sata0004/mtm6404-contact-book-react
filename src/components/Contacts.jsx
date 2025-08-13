import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from '../db';
import { collection, getDocs } from 'firebase/firestore';

const ContactListPage = () => {
  const [contactData, setContactData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'contacts'));
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        list.sort((a, b) => {
  const nameA = a?.name || "";
  const nameB = b?.name || "";
  return nameA.localeCompare(nameB);
});
        setContactData(list);
      } catch (error) {
        console.error("Error loading contacts:", error);
      }
    };
    loadContacts();
  }, []);

  const filteredContacts = contactData.filter(contact =>
    `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="row align-items-center mb-4">
        <div className="col">
          <h1 className="text-center text-md-start fw-bold" style={{ color: '#2c3e50' }}>
            📇 Contacts
          </h1>
        </div>
        
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control border-primary shadow-sm"
          placeholder="🔍 Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Contact Table */}
      {filteredContacts.length === 0 ? (
        <div className="alert alert-warning text-center">No contacts found.</div>
      ) : (
        <div className="table-responsive shadow-sm">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col" className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map(contact => (
                <tr key={contact.id}>
                  <td>
                    <Link to={`/view/${contact.id}`} className="text-decoration-none text-dark fw-medium">
                      {contact.lastName}, {contact.firstName}
                    </Link>
                  </td>
                  <td className="text-end">
                    <Link
                      to={`/update/${contact.id}`}
                      className="btn btn-outline-primary btn-sm me-2"
                    >
                      ✏️ Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactListPage;
