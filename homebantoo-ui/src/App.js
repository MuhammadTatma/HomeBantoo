// src/App.js
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'; // Tambahkan ini
import Header from './components/Header';
import Home from './components/Home';
import AddInventoryItem from './components/AddInventoryItem';
import InventoryList from './components/InventoryList';
import ExpiringSoonList from './components/ExpiringSoonList';


axios.defaults.baseURL = 'http://localhost:4000';

const App = () => {
  return (
    <ChakraProvider> 
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-inventory" element={<AddInventoryItem />} />
            <Route path="/inventory-list" element={<InventoryList />} />
            <Route path="/expiring-soon-list" element={<ExpiringSoonList />} />
          
          </Routes>
        </div>
      </Router>
    </ChakraProvider> 
  );
};

export default App;
