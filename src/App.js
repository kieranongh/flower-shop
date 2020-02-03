import React from 'react';
import logo from './logo.svg';
import './App.css';
import Rose from './models/Rose'

const App = () => {
  let rose1 = new Rose(25)
  console.log(`rose1 => `, rose1)
  console.log(`rose => `, rose)
  console.log(`rose1.order => `, rose1.order)
  return (
    <div>
    </div>
  );
}

export default App;
