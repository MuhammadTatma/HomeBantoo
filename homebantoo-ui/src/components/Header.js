import React from 'react';
import { Flex,Text, Button, Box, Heading, Link as ChakraLink, Spacer ,} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useGetUserInfo } from '../hooks/useGetUserInfo';

import { auth } from '../firebase/firebase-config';


const Header = () => {
  const {email} = useGetUserInfo();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await signOut(auth)
      localStorage.clear();
      navigate('/login')
      console.log('logged out');
    }catch(e){
      console.log(e.message);
    }
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="#FFFFFF"
      color="#D80202"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)" /* Drop shadow effect */
      borderRadius="12px" /* Rounded corners */
      width="100%" /* Set width to 100% */
      mx="auto" /* Center the menu horizontally */
    >
      
      <Flex align="center">
        <Heading as="h1" size="lg">
          <Link to="/" style={{ textDecoration: 'none', color: '#D80202' }}>
            Homebantoo
          </Link>
        </Heading>
      </Flex>

      {/* Centered Box */}
      <Flex align="center">
        <Spacer />

        <Box>
          <ChakraLink as={Link} to="/add-inventory" mr={4}>
            Add Inventory Item
          </ChakraLink>
          <ChakraLink as={Link} to="/inventory-list" mr={4}>
            Inventory List
          </ChakraLink>
          <ChakraLink as={Link} to="/expiring-soon-list">
            Expiring Soon List
          </ChakraLink>
        </Box>

        <Spacer />
      </Flex>

      {/* Profile and Settings Links */}
      <Flex align="center">
        <ChakraLink as={Link} to="/profile" mr={4}>
          Profile
        </ChakraLink>
        <Flex>
          <Box ml='2'>
          <Text mr={4}>{email}</Text>
          </Box>
        </Flex>
        
        <Button onClick={handleLogout} mr={4} colorScheme='red' variant='outline'>
          logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
