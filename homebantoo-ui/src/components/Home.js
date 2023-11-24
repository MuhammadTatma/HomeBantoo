import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Heading, Input, Stack, Text } from '@chakra-ui/react'; // Import Chakra UI components
import { useNavigate } from 'react-router-dom';
import { Recipe } from './Recipe';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipe, setRecipe] = useState([]);
  const [isSearch, setIsSearh] = useState(false);
  const navigate = useNavigate();
  const APP_ID = 'c7f5bf4a';
  const APP_KEY = '1dbbb43c492661ea75968f3b0d4baccc';

  const getRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      setRecipe(data.hits);
      console.log(data);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleSearch = async () => {
    try {
      setIsSearh(true);
      await getRecipes();
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };

  return (
    <Box
      p="4"
      position="relative"
      backgroundImage={isSearch? '' :  `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/Food.jpg')`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      textAlign="center"
      color="#D80202"
      height="70vh"
      boxShadow={isSearch?'':"0px 10px 20px rgba(0, 0, 0, 0.3)"}
    >
      <Heading as="h1" size="xl" mb="4">
        Welcome to Homebantoo!
      </Heading>
      <Box mb="4" display="flex" alignItems="center" justifyContent="center">
        <Input
          type="text"
          placeholder="Search for food items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          mr="2"
          w="300px"
        />
        <Button colorScheme="red" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      {recipe.length > 5 ? (
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
      ) : null}
    </Box>
  );
};

export default Home;
