import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Heading, List, ListItem } from '@chakra-ui/react';

const InventoryList = () => {
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get('/api/inventory');
        setInventoryItems(response.data);
      } catch (error) {
        console.error('Error fetching inventory items:', error);
      }
    };

    fetchInventoryItems();
  }, []);

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`/api/inventory/${itemId}`);
      // Fetch inventory items after deleting item
      const response = await axios.get('/api/inventory');
      setInventoryItems(response.data);
    } catch (error) {
      console.error('Error deleting inventory item:', error);
    }
  };

  const handleUpdateItem = async (itemId, newName, newExpirationDate) => {
    try {
      await axios.put(`/api/inventory/${itemId}`, {
        name: newName,
        expirationDate: newExpirationDate,
      });
      // Fetch inventory items after updating item
      const response = await axios.get('/api/inventory');
      setInventoryItems(response.data);
    } catch (error) {
      console.error('Error updating inventory item:', error);
    }
  };

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>
        Inventory List
      </Heading>
      <List>
        {inventoryItems.map(item => (
          <ListItem key={item._id} mb={2}>
            {item.name} - Expiration Date: {item.expirationDate}{' '}
            <Button colorScheme="red" size="sm" onClick={() => handleDeleteItem(item._id)}>
              Delete
            </Button>{' '}
            <Button
              colorScheme="teal"
              size="sm"
              onClick={() => {
                const newName = prompt('Enter the new name:');
                const newExpirationDate = prompt('Enter the new expiration date:');
                handleUpdateItem(item._id, newName, newExpirationDate);
              }}
            >
              Update
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default InventoryList;
