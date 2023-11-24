import React, { useState } from 'react';
// import axios from 'axios';
import { Box, Button, Heading, List, ListItem } from '@chakra-ui/react';
import { InventoryItem } from './InventoryItem';
import { useGetInventory } from '../hooks/useGetInventory';
import { useDeleteInventory } from '../hooks/useDeleteInventory';
import { daysUntillExpired } from '../utils/utils';

const InventoryList = () => {
  const { inventory } = useGetInventory();

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>
        Inventory List
      </Heading>
      <List>
        {inventory.map(item => (
          <InventoryItem key={item.id} {...item} />
        ))}
      </List>
    </Box>
  );
};

export default InventoryList;
