import React from 'react';
import logo from './logo.svg';
import './App.css';
import ActivityList from './pages/ActivityList';
import ActivityDisplay from './pages/ActivityPage';

import {
    BrowserRouter as Router, 
    Routes, 
    Route, 
} from 'react-router-dom';

function App() {
  return (
    <Router>
        <div className="App">
            <header className="App-header">
            <Routes>
                <Route path="/" element={<ActivityList/>}></Route>
                <Route path="activ" element={<ActivityDisplay/>}>
                    <Route index element={<ActivityDisplay/>}/>
                    <Route path=":activityId" element={<ActivityDisplay/>}/>
                </Route>
            </Routes>
            </header>
        </div>
    </Router>
  );
}

export default App;
