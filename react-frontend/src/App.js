import React, { useState, useEffect } from 'react';
import api from './api';

const App = () => {
  const [emails, setEmails] = useState([]);
  const [formData, setFormData] = useState({ email: '' });

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await api.get('/emails'); // Fetch emails
        setEmails(response.data);
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    };

    //fetchEmails();
  //}, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/emails', formData); // Submit email
      setFormData({ email: '' });
      const response = await api.get('/emails'); // Refresh email list
      setEmails(response.data);
    } catch (error) {
      console.error('Error submitting email:', error);
    }
  };

  const handleInputChange = (event) => {
    setFormData({ email: event.target.value });
  };

  return (
    <div >
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Naia App
          </a>
        </div>
      </nav>
      <div className="container mt-4">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Email</button>
        </form>
      </div>
    </div>
  );
};

export default App;
