import React from 'react';
import {
  Text,
  Button,
  Box,
  Heading,
  Link as ChakraLink,
  useDisclosure,
  Center,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import { auth } from '../firebase/firebase-config';

const Header = () => {
  const { email } = useGetUserInfo();
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate('/login');
      console.log('logged out');
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
   
    <Center>
    <Box>
      <Heading fontSize="xl" mb={2} mt={6}>
        User Profile
      </Heading>
      <Text fontSize="xl" mb={2}>
        Email: {email}
      </Text>
      <Button mt={4} colorScheme="red" onClick={handleLogout} variant="solid">
        Logout
      </Button>
    </Box>
  </Center>
    
  );
};

export default Header;
