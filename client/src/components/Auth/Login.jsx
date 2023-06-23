import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from "../../redux/actions/user";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  return (
    <Container h={"100vh"}>
      <VStack h={"full"} justifyContent={"center"} spacing={"16"}>
        <Heading children={"Welcome to reCourse"} />

        <form style={{width: "100%"}} onSubmit={submitHandler}>
          <Box marginY={"4"}>
            <FormLabel htmlFor="email" children="Email address" />
            <Input 
              required 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@gmail.com"
              type={"email"}
              focusBorderColor={"blue.500"}
            />
          </Box>
          
          <Box marginY={"4"}>
            <FormLabel htmlFor="password" children="Password" />
            <Input 
              required 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password here"
              type={"password"}
              focusBorderColor={"blue.500"}
            />
          </Box>
          
          <Box marginY={"4"}>
            <Link to="/forgot_password">
              <Button fontSize={"sm"} variant={"link"}>
                Forgot password?
              </Button>
            </Link>
          </Box>

          <Button marginY={"4"} colorScheme={"blue"} type="submit">
            Login
          </Button>

          <Box marginY={"4"}>
            New user? {" "}
            <Link to="/register">
              <Button variant="link" colorScheme={"blue"}>
                Sign Up
              </Button>
            </Link>
            {" "} here!
          </Box>
        </form>
      </VStack>
    </Container>
  )
}

export default Login