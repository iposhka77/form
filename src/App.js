import React, { useState, useEffect } from 'react';
import './App.css';
import FormComponent from './components/FormComponent';
import FormList from './components/FormList';
import axios from 'axios';

function App() {
  const [forms, setForms] = useState([]);

  const fetchForms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/forms');
      setForms(response.data);
    } catch (error) {
      console.error('Ошибка при получении анкет:', error);
    }
  };

  const addForm = (newForm) => {
    setForms((prevForms) => [...prevForms, newForm]); 
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <FormComponent onFormSubmit={addForm} /> 
        <FormList forms={forms} />
      </header>
    </div>
  );
}

export default App;
