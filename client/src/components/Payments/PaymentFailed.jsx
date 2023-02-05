import { Button, Container, Heading, Link, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiErrorWarningFill } from 'react-icons/ri'

const PaymentFailed = () => {
  return (
    <Container height={"85vh"}>
      <VStack justifyContent={"center"} height="full" spacing={"4"}>
        
        <RiErrorWarningFill size="4rem" />
        <Heading
          marginY="8"
          textAlign={"center"}
          children="Payment failed!"
        />

        <Link to="/home">
          <Button>
            Try again!
          </Button>
        </Link>
        
      </VStack>
    </Container>
  )
}

export default PaymentFailed