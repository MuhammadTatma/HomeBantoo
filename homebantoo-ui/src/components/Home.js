// components/Home.js
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Heading, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search-recipes?query=${searchQuery}`);
      setSearchResults(response.data);
      navigate('/search-results'); // Navigate to the search results page
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };

  return (
    <Box>
      <Heading as="h1" size="xl" mb={4}>
        Welcome to Homebantoo!
      </Heading>
      <Box>
        <Input
          type="text"
          placeholder="Search for food items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          mr={2}
        />
        <Button colorScheme="teal" onClick={handleSearch}>
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
