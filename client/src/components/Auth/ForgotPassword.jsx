import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { React, useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  return (
    <Container paddingY={"16"} height="85vh">
      <form>
        <Heading children="Enter Your E-mail" marginY={"16"} textAlign={"center"} />

        <VStack>
          <Input 
            required 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@gmail.com"
            type={"email"}
            focusBorderColor={"yellow.500"}
          />
        
        <Button type="submit" w="full" colorScheme={"yellow"}>
          Send Reset Link
        </Button>

        </VStack>
      </form>
    </Container>
  )
}

export default ForgotPassword