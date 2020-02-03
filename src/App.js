import React from 'react';
import logo from './logo.svg';
import './App.css';
import Rose from './models/Rose'

function App() {
  let rose1 = new Rose(25)
  console.log(`rose1 => `, rose1)
  console.log(`rose1.quantity => `, rose1.quantity)
  console.log(`rose1.order => `, rose1.order)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
