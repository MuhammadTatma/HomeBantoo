'use client'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Switch,
  SimpleGrid,
  Text  
} from '@chakra-ui/react'
import { useState } from 'react'
import { useGetUserInfo } from '../hooks/useGetUserInfo'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase-config'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/firebase-config'

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const {email, username : p, userID, preferences :pref} = useGetUserInfo();
  const [username, setUsername] = useState(p)
  const [preferences, setPreferenes] = useState(pref)
  const navigate = useNavigate()

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

  const handleSave = async () => {
    setIsLoading(true);
    try{
      const docRef = doc(db, 'users', userID)
      await updateDoc(docRef, {
        "username": username,
        "preferences": preferences
      })
      const authInfo = {
        userID: userID,
        username: username,
        email: email,
        isAuth: true,
        preferences: preferences
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      setIsLoading(false);
    }catch(e){
      alert(e.message);
      setIsLoading(false);
    }
  }




  const handleSwitch = (e) => {
    const name = e.target.name;
    console.log(name, + '');
    preferences[name] = e.target.checked
    setPreferenes({...preferences})
    console.log(preferences);
  }

  return (
    <Flex
      // minH={'100vh'}
      align={'center'}
      justify={'center'}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        // boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>

        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            readOnly
            isDisabled
            variant={'filled'}
            defaultValue={email}
            placeholder="email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>New Password</FormLabel>
          <Input
            placeholder="password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
          />
        </FormControl>
        <FormControl id="newPassword" isRequired>
          <FormLabel>Confirm New Password</FormLabel>
          <Input
            placeholder="new Password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
          />
        </FormControl>
        <Stack spacing={0}>
          <FormLabel>Preferences</FormLabel>
          <FormControl as={SimpleGrid} columns={{ base: 2, lg: 4 }}>
            <Text  textAlign='start' pl={3} fontSize='sm' mb={1} htmlFor='isChecked'>High-Protein </Text>
            <Switch defaultChecked={preferences['high-protein']} name='high-protein' onChange={handleSwitch} id='isChecked'  />

            <Text textAlign='start' pl={3} fontSize='sm' mb={1} htmlFor='isDisabled'>No-Oil Added  </Text>
            <Switch defaultChecked={preferences['no-oil-added']} name='no-oil-added' onChange={handleSwitch} id='isDisabled'   />

            <Text textAlign='start' pl={3} fontSize='sm'mb={1} htmlFor='isFocusable'>Low-Sugar  </Text>
            <Switch defaultChecked={preferences['low-sugar']} name='low-sugar' onChange={handleSwitch} id='isFocusable'   />

            <Text textAlign='start' pl={3} mb={1} fontSize='sm' htmlFor='isInvalid'>Low-Carb  </Text>
            <Switch defaultChecked={preferences['low-carb']} name='low-carb' onChange={handleSwitch} id='isInvalid'  />

            <Text textAlign='start' pl={3} fontSize='sm' mb={1} htmlFor='isReadOnly'>Low-Fat  </Text>
            <Switch defaultChecked={preferences['low-fat']} name='low-fat' onChange={handleSwitch} id='isReadOnly'  />

            <Text  textAlign='start' pl={3} fontSize='sm' mb={1} htmlFor='isRequired'>Vegan  </Text>
            <Switch defaultChecked={preferences['vegan']} name='vegan' onChange={handleSwitch} id='isRequired'  />
          </FormControl>
        </Stack>
        <Stack spacing={6} direction={['column']}>
          <Button onClick={handleSave}
            isLoading={isLoading}
            boxShadow={'2xl'}
            bg={'teal'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'teal.500',
            }}>
            Save
          </Button>
          <Button
            onClick={handleLogout}
            bg={'red.400'}
            boxShadow={'2xl'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
            Logout
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}
