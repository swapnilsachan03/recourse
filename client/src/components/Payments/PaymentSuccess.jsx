import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const PaymentSuccess = () => {
  return (
    <Container height={"85vh"} padding="16">
      <Heading
        marginY="8"
        textAlign={"center"}
        children="You are a Pro member now!"
      />

      <VStack
        boxShadow={"lg"} 
        paddingBottom={"16"} 
        alignItems="center" 
        borderRadius={"lg"}
      >
        <Box
          width={"full"}
          bg="yellow.400"
          padding={"4"}
          css={{borderRadius: "8px 8px 0 0"}}
        >
          <Text children="Payment successful!" />
        </Box>

        <Box padding={"4"}>
          <VStack textAlign={"center"} paddingX="8" marginTop={"4"} spacing="8">
            
            <Text children="Congratulations, you now have access to all the premium content on reCourse" />
            
            <Heading size={"4xl"}>
              <RiCheckboxCircleFill />
            </Heading>

          </VStack>
        </Box>

        <Link to="/profile">
          <Button variant={"ghost"}>
            Go to your profile
          </Button>
        </Link>
        
        <Heading size="xs" children="Reference number: #gsegfkjsv" />
      </VStack>
    </Container>
  )
}

export default PaymentSuccess