import { Button, Container, Heading, Link, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiErrorWarningFill } from 'react-icons/ri'

const NotFound = () => {
  return (
    <Container height={"85vh"}>
      <VStack justifyContent={"center"} height="full" spacing={"4"}>
        
        <RiErrorWarningFill size="4rem" />
        <Heading
          marginY="8"
          textAlign={"center"}
          children="Page not found!"
        />

        <Link to="/home">
          <Button>
            Go to Home
          </Button>
        </Link>
        
        <Heading size="xs" children="Error 404: Not Found" />
      </VStack>
    </Container>
  )
}

export default NotFound