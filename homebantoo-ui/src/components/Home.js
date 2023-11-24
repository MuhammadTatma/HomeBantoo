// components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Heading, Input, List } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from './Recipe';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipe, setRecipe] = useState([]);
  const navigate = useNavigate();
  const APP_ID = 'c7f5bf4a';
  const APP_KEY = '1dbbb43c492661ea75968f3b0d4baccc';

  const getRecipes = async () => {
    try{
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`)
      const data = await response.json()
      setRecipe(data.hits);
      console.log(data);
    }catch(e){
      alert(e.message);
    }
  }


  const handleSearch = async () => {
    try {
      const response = await getRecipes();
      setRecipe(response.data);
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
      <List>
        {recipe.map(recipe => (
          <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients} />  
        ))}
      </List>
    </Box>
  );
};

export default Home;
