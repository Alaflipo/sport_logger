import React from 'react';
import logo from './logo.svg';
import './App.css';
import ActivityList from './components/ActivityList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ActivityList/>
      </header>
    </div>
  );
}

export default App;
