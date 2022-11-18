import React from 'react';
import './App.css';
import ActivityList from './pages/ActivityList';
import UserList from './pages/UserList';

import {
    BrowserRouter as Router, 
    Routes, 
    Route, 
} from 'react-router-dom';
import HomeScreen from './pages/Home';
import ActivityPage from './pages/ActivityPage';


function App() {
  return (
    <Router>
        <div className="App">
            <header className="App-header">
                <h1>Welcome to sportslogger</h1>
            </header>
            <Routes>
                <Route path="/" element={<HomeScreen/>}></Route>
                <Route path="/users">
                    <Route index element={<UserList/>}/>
                    <Route path=":userId" element={<UserList/>}/>
                </Route>
                <Route path="/activ">
                    <Route index element={<ActivityList/>}/>    
                    <Route path={':activityId'} element={<ActivityPage/>}/>   
                </Route>
            </Routes>
            
        </div>
    </Router>
  );
}

export default App;
