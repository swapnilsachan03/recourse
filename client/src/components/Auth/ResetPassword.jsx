import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { React, useState } from "react";
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const params = useParams();
  console.log(params.token);

  return (
    <Container paddingY={"16"} height="85vh">
      <form>
        <Heading children="Reset Password" marginY={"16"} textAlign={"center"} />

        <VStack>
          <Input 
            required
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your new password"
            type={"password"}
            focusBorderColor={"yellow.500"}
          />
        
        <Button type="submit" w="full" colorScheme={"yellow"}>
          Update Password
        </Button>

        </VStack>
      </form>
    </Container>
  )
}

export default ResetPassword