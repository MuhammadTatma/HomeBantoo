'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useGetUserInfo } from '../hooks/useGetUserInfo'
import { auth, provider } from '../firebase/firebase-config'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase-config'


export default function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [registerSpinner, setRegisterSpinner] = useState(false);
  const [googleSpinner, setGoogleSpinner] = useState(false);

  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const signInWithGoogle = async () =>{
    setGoogleSpinner(true);
    provider.setCustomParameters({
      'prompt': 'select_account'
    })
    try{
      const results = await signInWithPopup(auth, provider);
      const userDoc = await getDoc(doc(db, 'users', results.user.uid))
      let pref = {'low-sugar': false, 'no-oil-added': false, 'low-carb': false, 'low-fat': false, 'vegan': false}
      if (userDoc.exists()) {
        console.log("Document data:", userDoc.data());
        pref = userDoc.data().preferences;
      } else {
        await setDoc(doc(db, 'users', results.user.uid), {username: results.user.displayName,email: results.user.email,preferences: pref,})
        console.log("Create new user document");
      }
      const authInfo = {
        userID: results.user.uid,
        username: results.user.displayName,
        email: results.user.email,
        isAuth: true,
        preferences: pref
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      setGoogleSpinner(false);
      navigate("/");
    }catch(e){
      setGoogleSpinner(false);
      alert(e.message);
    }
  }

  const handleRegisterButton = async () => {
    setRegisterSpinner(true);
    try{
      const user = await createUserWithEmailAndPassword(auth, email, password)
      let pref = {'low-sugar': false, 'no-oil-added': false, 'low-carb': false, 'low-fat': false, 'vegan': false}
      await setDoc(doc(db, 'users', user.user.uid), {username: username,email: email,preferences: pref,})
      const authInfo = {
        userID: user.user.uid,
        username: username,
        email: user.user.email,
        isAuth: true,
        preferences: pref
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      setRegisterSpinner(false)
      navigate('/');
    }catch(e){
      alert(e)    
      console.log(e);
    }
  }

  const fColor = useColorModeValue('gray.50', 'gray.800');
  const sColor = useColorModeValue('white', 'gray.700');

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={fColor}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} w={['sm','md']} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'xl'}>Hello! Register to get started</Heading>
        </Stack>
        <Box rounded={'lg'} bg={sColor} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" onChange={(e) => setUsername(e.target.value)} />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <FormControl id="confirmPassword" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
            </FormControl>
            <Stack spacing={10}>
              <Stack mt={3} spacing={3} >
                <Button isLoading={registerSpinner}  type='button'  bg={'#D80202'} color={'white'} _hover={{ bg: '#FF3D00', }} onClick={handleRegisterButton}>
                  Register
                </Button>
                <Text fontSize='sm' as='b' >Or Register With</Text>
                <Button onClick={signInWithGoogle} isLoading={googleSpinner} w={'full'} variant={'outline'} >
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  </svg>
                  <Text mx={3}>Register with Google</Text>
                </Button>
              </Stack>

              <Text align={'center'} fontSize='sm'>
                Already have an Account? <Link href='/login' color={'blue.400'}>Login</Link>
              </Text>

            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}