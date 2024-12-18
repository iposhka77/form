import React from 'react';
import './App.css';  
import FormComponent from './components/FormComponent';
import FormList from './components/FormList'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FormComponent />
        <FormList /> 
      </header>
    </div>
  );
}

export default App;
