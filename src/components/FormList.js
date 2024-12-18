import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FormList = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/forms');
        setForms(response.data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, []);

  return (
    <div className="form-list-container">
      <h2>Submitted Forms</h2>
      {forms.length === 0 ? (
        <p>No forms submitted yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Gender</th>
              <th>Subject</th>
              <th>URL</th>
              <th>About</th>
              <th>Resume</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form._id}>
                <td>{form.firstName}</td>
                <td>{form.lastName}</td>
                <td>{form.email}</td>
                <td>{form.contact}</td>
                <td>{form.gender}</td>
                <td>{form.subject}</td>
                <td>{form.url}</td>
                <td>{form.about}</td>
                <td>
                  {form.resume && <a href={`http://localhost:5000/uploads/${form.resume}`} target="_blank" rel="noopener noreferrer">Download</a>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FormList;

