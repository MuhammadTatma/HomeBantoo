import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, List, ListItem } from '@chakra-ui/react';

const ExpiringSoonList = () => {
  const [expiringSoonItems, setExpiringSoonItems] = useState([]);

  useEffect(() => {
    const fetchExpiringSoonItems = async () => {
      try {
        const response = await axios.get('/api/expiring-soon');
        setExpiringSoonItems(response.data);
      } catch (error) {
        console.error('Error fetching expiring soon items:', error);
      }
    };

    fetchExpiringSoonItems();
  }, []);

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>
        Expiring Soon
      </Heading>
      <List>
        {expiringSoonItems.map(item => (
          <ListItem key={item._id} mb={2}>
            {item.name} - Expiration Date: {item.expirationDate}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ExpiringSoonList;
