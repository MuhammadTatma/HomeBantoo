// components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Heading, Input, List,Stack,Text } from '@chakra-ui/react';
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
     // Navigate to the search results page
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };

  return (
    <Box p="4">
      <Heading as="h1" size="xl" mb="4" textAlign="center" color="#D80202">
        Welcome to Homebantoo!
      </Heading>
      <Box mb="4" display="flex" alignItems="center" justifyContent="center">
        <Input
          type="text"
          placeholder="Search for food items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          mr="2"
          w="300px" // Set a fixed width for the input
        />
        <Button colorScheme="teal" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <Stack spacing={4}>
        {recipe.map((recipe) => (
          <Box
            key={recipe.recipe.label}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            boxShadow="md"
          >
            <Heading as="h2" size="md" mb={2}>
              {recipe.recipe.label}
            </Heading>
            <Text mb={2}>Calories: {recipe.recipe.calories.toFixed(2)}</Text>
            <Recipe
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Home;
