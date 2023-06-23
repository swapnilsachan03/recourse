import { Box, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { AiFillGithub, AiFillYoutube, AiOutlineInstagram } from "react-icons/ai";
import React from 'react';

const Footer = () => {
  return (
    <Box paddingX={"4"} py={"12"} bg={"blackAlpha.900"}>
      <Stack direction={["column", "row"]}>
        <VStack alignItems={["center", "flex-start"]} justifyContent={"between"} width={"full"}>
          
          <Heading children="All rights reserved." color={"white"} fontWeight={"thin"} fontSize={"4xl"} />
          <Text
            fontFamily={"body"} 
            size="sm"
            children="© Swapnil Sachan" 
            color={"blue.400"} 
          />

        </VStack>

        <HStack 
          spacing={["2", "4"]} 
          justifyContent="center"
          color={"white"}
          fontSize={"36"}
        >
          <a href="https://www.youtube.com/@swapnil-sachan" target={"_blank"} rel='noreferrer'>
            <AiFillYoutube />
          </a>
          <a href="https://www.instagram.com/swapnilsachan03" target={"_blank"} rel='noreferrer'>
            <AiOutlineInstagram />
          </a>
          <a href="https://www.github.com/swapnil-sachan" target={"_blank"} rel='noreferrer'>
            <AiFillGithub />
          </a>
        </HStack>
      </Stack>
    </Box>
  )
}

export default Footer