import React, { useState } from 'react';
import { Input, Button, Heading, FormControl, FormLabel, Stack ,HStack, Container} from '@chakra-ui/react';
import { useAddInventory } from '../hooks/useAddInventory';

const AddInventoryItem = () => {
  const [name, setItemName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [expired, setExpirationDate] = useState(new Date());

  const { addInventory } = useAddInventory();

  const handleAddItem = async () => {
    try {
      addInventory({name, quantity, expired})
      alert('berhasil');
    } catch (error) {
      alert('Error adding inventory item:', error);
    }
  };

  return (
    <Container centerContent>
      <Stack spacing={6} align="center" width="90%">
        <Heading size="lg">Add Inventory Item</Heading>
        <FormControl isRequired>
          <HStack>
            <FormLabel >Item Name:</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setItemName(e.target.value)}
              variant="filled"
              isFullWidth
            />
          </HStack>
        </FormControl>
        <FormControl isRequired>
          <HStack>
            <FormLabel>Quantity:</FormLabel>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              variant="filled"
              isFullWidth
            />
          </HStack>
        </FormControl>
        <FormControl isRequired>
          <HStack>
            <FormLabel>Expired Date:</FormLabel>
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="date"
              onChange={(e) => setExpirationDate(e.target.value)}
              variant="filled"
              isFullWidth
            />
          </HStack>
        </FormControl>
        <Button onClick={handleAddItem} colorScheme="teal" isFullWidth>
          Add Item
        </Button>
      </Stack>
    </Container>
  );
};

export default AddInventoryItem;
