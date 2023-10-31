import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './components/login/login'; 
import Dashboard from './components/dashboard/dashboard';
import DataMaster from './components/datamaster/datamaster';
import Report from './components/report/report';
import User from './components/user/user';
import PrintReport from './components/report/printreport';

const App = () => {
  return (
    <Router> 
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/data" element={<DataMaster />} />
          <Route path="/report" element={<Report />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/printpage" element={<PrintReport />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
