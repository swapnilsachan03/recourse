import { Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

const Loader = ({color = "blue.400"}) => {
  return (
    <VStack height={"100vh"} justifyContent={"center"}>
      <div style={{ transform: "scale(2)" }}>
        <Spinner
          thickness="3px"
          speed="0.75s"
          emptyColor={"transparent"}
          color={color}
          size={"xl"}
        />
      </div>
    </VStack>
  )
}

export default Loader