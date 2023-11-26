// src/App.js
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'; // Tambahkan ini
import Home from './components/Home';
import AddInventoryItem from './components/AddInventoryItem';
import InventoryList from './components/InventoryList';
import ExpiringSoonList from './components/ExpiringSoonList';
import Login from './components/Login';
import ProtectedLayout from './components/ProtectedLayouts';
import Signup from './components/Signup';
import Profile from './components/Profile';



axios.defaults.baseURL = 'http://localhost:4000';

const App = () => {
  return (
    <ChakraProvider>
        <Router>
          <div>
            <Routes>
              <Route element={ <ProtectedLayout/> }>
                <Route path="/" element={<Home />} />
                <Route path="/add-inventory" element={<AddInventoryItem />} />
                <Route path="/inventory-list" element={<InventoryList />} />
                <Route path="/expiring-soon-list" element={<ExpiringSoonList />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </Routes>
          </div>
        </Router>
    </ChakraProvider> 
  );
};

export default App;
