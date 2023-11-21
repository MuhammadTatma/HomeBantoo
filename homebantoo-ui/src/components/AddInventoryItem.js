import React, { useState } from 'react';
import { Input, Button, Heading, FormControl, FormLabel, Stack } from '@chakra-ui/react';
import axios from 'axios';

const AddInventoryItem = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [expirationDate, setExpirationDate] = useState('');

  const handleAddItem = async () => {
    try {
      await axios.post('/api/inventory', { name: itemName, quantity, expirationDate });
      window.location.reload();
    } catch (error) {
      console.error('Error adding inventory item:', error);
    }
  };

  return (
    <Stack spacing={4} align="center">
      <Heading size="lg">Add Inventory Item</Heading>
      <FormControl>
        <FormLabel>Item Name:</FormLabel>
        <Input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          variant="filled"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Quantity:</FormLabel>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          variant="filled"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Expiration Date:</FormLabel>
        <Input
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          variant="filled"
        />
      </FormControl>
      <Button onClick={handleAddItem} colorScheme="teal">
        Add Item
      </Button>
    </Stack>
  );
};

export default AddInventoryItem;
