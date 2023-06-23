import React from 'react';
import { Link } from "react-router-dom";
import { Stack, VStack, Heading, Text, Button, Image, Box, HStack } from "@chakra-ui/react";
import "./Home.css";
import homeImage from "../../assets/images/home-bg.png";
import { AiFillAmazonCircle, AiFillSkype, AiFillYoutube, AiOutlineGoogle } from "react-icons/ai"
import { CgMicrosoft } from "react-icons/cg";
import { SiCoursera, SiUdemy, SiZoom } from "react-icons/si";

const Home = () => {
  return (
  <section className="home">
    <div className="container">
      <Stack
        direction={["column", "row"]}
        height="100%"
        justifyContent={["center", "space-between"]}
        alignItems="center"
        spacing={["16","18","20","26"]}
      >

        <VStack width={"full"} alignItems={["center", "flex-end"]} spacing={"10px"}>
          <Heading children="Learn from the Experts!" size="2xl" fontFamily={"Poppins"} />
          <Text textAlign={["center","left"]} children="Find valuable content at reasonable prices." fontSize={"20px"} />

          <Link to="/courses">
            <Button size={"lg"} colorScheme={"blue"} mt={"6"}>
              Explore more
            </Button>
          </Link>
        </VStack>

        <Image boxSize={"md"} src={homeImage} objectFit={"contain"} className="home-image" />
      </Stack>
    </div>

    <Box padding={"8"} bg={"blackAlpha.800"} >
      <Heading
        textAlign={"center"}
        fontFamily={"body"}
        color={"blue.400"}
        children="Our Channels"
      />

      <HStack className="brands-banner" justifyContent={"space-evenly"} marginTop="8" >
        <AiOutlineGoogle />
        <AiFillYoutube />
        <SiCoursera />
        <SiUdemy />
        <AiFillAmazonCircle />
        <CgMicrosoft />
        <AiFillSkype />
        <SiZoom />
      </HStack>
    </Box>

    <div className="video-container">
      <video
        autoPlay={true}
        controls
        loop
        src='/video/intro.mp4'
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
      />
    </div>
  </section>
  )
}

export default Home