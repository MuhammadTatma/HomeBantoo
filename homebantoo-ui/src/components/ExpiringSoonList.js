import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Heading,Table, Thead, Tbody, Tr, Th, Td,Center } from '@chakra-ui/react';
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
    <Center>
    <Box>
      <Heading as="h2" size="lg" mb={4} mt="5">
        Expiring Soon
      </Heading>
      <Table Table variant="striped" colorScheme="red" >
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Expiration Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {inventory.map((item) => {
            if (daysUntillExpired(item.expired) <= 3) {
              return (
                <Tr key={item.id}>
                  <Td>{item.name}</Td>
                  <Td>{item.expired}</Td>
                </Tr>
              );
            }
            return null; // Make sure to return null for items you don't want to render
          })}
        </Tbody>
      </Table>
    </Box>
    </Center>
  );
};

export default ExpiringSoonList;
