import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react';
import { TiSocialGithubCircular, TiSocialInstagramCircular, TiSocialYoutubeCircular } from 'react-icons/ti';
import {} from 'react-icons/di';
import React from 'react';

const Footer = () => {
  return (
    <Box padding={"4"} bg={"blackAlpha.900"} minH={"15vh"}>
      <Stack direction={["column", "row"]}>
        <VStack alignItems={["center", "flex-start"]} width={"full"}>
          
          <Heading children="All rights reserved" color={"white"} />
          <Heading 
            fontFamily={"body"} 
            size="sm" 
            children="@Swapnil Sachan" 
            color={"yellow.400"} 
          />

        </VStack>

        <HStack 
          spacing={["2", "10"]} 
          justifyContent="center"
          color={"white"}
          fontSize={"50"}
        >
          <a href="https://www.youtube.com/@swapnil-sachan" target={"_blank"}>
            <TiSocialYoutubeCircular />
          </a>
          <a href="https://www.instagram.com/swapnilsachan03" target={"_blank"}>
            <TiSocialInstagramCircular />
          </a>
          <a href="https://www.github.com/maybe-swapnil" target={"_blank"}>
            <TiSocialGithubCircular />
          </a>
        </HStack>
      </Stack>
    </Box>
  )
}

export default Footer