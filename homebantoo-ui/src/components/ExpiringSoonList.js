import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Heading, List, Text, ListItem } from '@chakra-ui/react';
import { Recipe } from './Recipe';
import { useGetInventory } from '../hooks/useGetInventory';
import { daysUntillExpired } from '../utils/utils';


const ExpiringSoonList = () => {
  const [recommendation, setRecommendation] = useState([]);
  const {inventory} = useGetInventory();
  

  const APP_ID = 'c7f5bf4a';
  const APP_KEY = '1dbbb43c492661ea75968f3b0d4baccc';

  const getRecipesByInventory = async () => {
    try{
      let query = '';
      inventory.forEach((item) => {
        query = query + `${item.name}, `
      })
      console.log(query);
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
      const data = await response.json()
      setRecommendation(data.hits);
      console.log(data);
    }catch(e){
      alert(e.message);
    }
  }



  // useEffect(() => {
  //   // const fetchExpiringSoonItems = async () => {
  //   //   try {
  //   //     const response = await axios.get('/api/expiring-soon');
  //   //     setExpiringSoonItems(response.data);
  //   //   } catch (error) {
  //   //     console.error('Error fetching expiring soon items:', error);
  //   //   }
  //   // };
  //   getRecipesByInventory();
  //   // fetchExpiringSoonItems();
  // }, []);

  return (
    // <Box>
    //   <Heading as="h2" size="lg" mb={4}>
    //     Expiring Soon
    //   </Heading>
    //   <List>
    //     <Button onClick={getRecipesByInventory}>get Recomendation by Inventory</Button>

    //     {recommendation.length <= 0 ? <Text>Kosong</Text> :recommendation.map(recipe => (
    //       <Recipe key={recipe.recipe.calories} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients} />  
    //     ))}
    //   </List>
    // </Box>
    <Box>
    <Heading as="h2" size="lg" mb={4}>
      Expiring Soon
    </Heading>
    <List>
      {inventory.map(item => {
        if(daysUntillExpired(item.expired) <= 3){
          return (
            <ListItem key={item.id} mb={2}>
              {item.name} - Expiration Date: {item.expired}
            </ListItem>
          )
        }
      } )}
    </List>
  </Box>
  );
};

export default ExpiringSoonList;
