import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(jsonInput);
      const response = await axios.post('https://bajaj-backend-6.onrender.com/api/bfhl', { data: parsedData.data });
      setResponseData(response.data);
    } catch (error) {
      console.error('Invalid JSON or server error', error);
    }
  };

  const renderResponse = () => {
    if (!responseData) return null;

    return (
      <div>
        {selectedOptions.includes('alphabets') && (
          <div>
            <h3>Alphabets:</h3>
            <p>{responseData.alphabets.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('numbers') && (
          <div>
            <h3>Numbers:</h3>
            <p>{responseData.numbers.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('highest_lowercase_alphabet') && (
          <div>
            <h3>Highest Lowercase Alphabet:</h3>
            <p>{responseData.highest_lowercase_alphabet.join(', ')}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>BFHL Challenge</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          cols="50"
          placeholder='Enter JSON e.g. {"data": ["a", "B", "2"]}'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {responseData && (
        <>
          <h2>Select Data to Display:</h2>
          <Select
            isMulti
            options={options}
            onChange={(selected) => setSelectedOptions(selected.map(opt => opt.value))}
          />
          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;
