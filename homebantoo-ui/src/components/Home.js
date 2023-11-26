import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Recipe } from './Recipe';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipe, setRecipe] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();
  const APP_ID = 'c7f5bf4a';
  const APP_KEY = '1dbbb43c492661ea75968f3b0d4baccc';

  useEffect(() => {
    setIsSearch(false); // Reset isSearch when the component mounts
  }, []);

  const handleSearch = async () => {
    try {
      setIsSearch(true);
      await getRecipes();
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };

  const getRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      setRecipe(data.hits);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      key="home-container"
    >
      <Box
        p="4"
        position="relative"
        backgroundImage={
          isSearch ? '' : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/Food.jpg')`
        }
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        rounded={20}
        textAlign="center"
        color="#D80202"
        mt={2}
        height="70vh"
        boxShadow={isSearch ? '' : '0px 10px 20px rgba(0, 0, 0, 0.3)'}
      >
        <Heading as="h1" size="xl" mb="18" color="white">
          Welcome to Homebantoo!
        </Heading>
        <motion.Box
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          mb="4"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Input
            type="text"
            placeholder="Search for food items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            mr="2"
            width="300px"
            color={isSearch ? 'black' : 'white'}
          />
          <Button
            colorScheme="red"
            onClick={handleSearch}
            _hover={{ transform: 'scale(1.05)' }}
          >
            Search
          </Button>
        </motion.Box>
        {recipe.length > 5 ? (
          <Stack spacing={4}>
            {recipe.map((recipe) => (
              <motion.Box
                key={recipe.recipe.label}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="md"
              >
                <Heading as="h2" size="md" mb={2} color="black">
                  {recipe.recipe.label}
                </Heading>
                <Text mb={2} color="black">
                  Calories: {recipe.recipe.calories.toFixed(2)}
                </Text>
                <Recipe
                  key={recipe.recipe.label}
                  title={recipe.recipe.label}
                  calories={recipe.recipe.calories}
                  image={recipe.recipe.image}
                  ingredients={recipe.recipe.ingredients}
                />
              </motion.Box>
            ))}
          </Stack>
        ) : null}
      </Box>
    </motion.div>
  );
};

export default Home;
