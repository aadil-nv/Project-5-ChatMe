import React from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import  { useState } from "react";


const Login = () => {
  
   
      const [show, setShow] = useState(false)
      const [name, setName] = useState();
      const [email, setEmail] = useState();
      const [password, setPassword] = useState();
      const [confirmPassword, setConfirmPassword] = useState();
      const [picture, setPicture] = useState();

  const handleClick = () => setShow(!show)
  const postDetiles = (pictures) => { }
  const submitHandler = () => { }

      return (
      <VStack spacing="5px" color="black">
        <FormControl id="first-name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter Your Email"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
       
        

        <Button
          colorScheme="green"
          width="100%"
          style={{ marginTop: 10 }}
          onClick={submitHandler}
        >
          Login
        </Button>
        <Button
        variant="solid"
        colorScheme='red'
        width="100%"
        onClick={()=>{
          setEmail("guest@example.com");
          setPassword("123456");
        }}
        >
          Get User Credentials
        </Button>
      </VStack>
      );
   
  
}

export default Login
