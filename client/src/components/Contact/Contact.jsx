import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react';
import { React, useState } from "react";
import { Link } from 'react-router-dom';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <Container height={"100vh"}>
      <VStack height={"full"} justifyContent={"center"} spacing="16">
        <Heading children="Contact Us" />

        <form style={{width: "100%"}}>
          
          <Box marginY={"4"}>
            <FormLabel htmlFor="name" children="Name" />
            <Input 
              required 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              type={"text"}
              focusBorderColor={"blue.500"}
            />
          </Box>
          
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
            <FormLabel htmlFor="message" children="Your message" />
            <Textarea 
              required 
              id="message" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              type={"text"}
              focusBorderColor={"blue.500"}
            />
          </Box>
          
          <Button marginY={"4"} colorScheme={"blue"} type="submit">
            Send Mail
          </Button>

          <Box marginY={"4"}>
              Want a new course? {" "}
              <Link to="/request">
                <Button variant="link" colorScheme={"blue"}>
                  Request
                </Button>
              </Link>
              {" "} here!
            </Box>
        </form>
      </VStack>
      
    </Container>
  )
}

export default Contact