import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9000/api/cars`)
      .then(data => data.json())
      .then(data => setCars(data));
  }, []);

  return (
    <div>
      <div className='car-list'>
        {
          cars.map((car, i) => {
            return (
              <div key={i}>{car.name}, color: {car.color}</div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
