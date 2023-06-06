import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react';
import { React, useState } from "react";
import { Link } from 'react-router-dom';

const Request = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDesc, setCourseDesc] = useState("");

  return (
    <Container height={"85vh"}>
      <VStack height={"full"} justifyContent={"center"} spacing="16">
        <Heading children="Request a Course" />

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
            <FormLabel htmlFor="course" children="Course You Want" />
            <Input 
              required 
              id="course" 
              value={courseName} 
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Name of the course"
              type={"text"}
              focusBorderColor={"blue.500"}
            />
          </Box>
          
          <Box marginY={"4"}>
            <FormLabel htmlFor="course description" children="Describe the Course" />
            <Textarea 
              required 
              id="course-description" 
              value={courseDesc} 
              onChange={(e) => setCourseDesc(e.target.value)}
              placeholder="Course description"
              type={"text"}
              focusBorderColor={"blue.500"}
            />
          </Box>
          
          <Button marginY={"4"} colorScheme={"blue"} type="submit">
            Send Mail
          </Button>

          <Box marginY={"4"}>
              Want to see available courses? {" "}
              <Link to="/courses">
                <Button variant="link" colorScheme={"blue"}>
                  Click
                </Button>
              </Link>
              {" "} here!
            </Box>
        </form>
      </VStack>
      
    </Container>
  )
}

export default Request