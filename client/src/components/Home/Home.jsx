import React from 'react';
import { Link } from "react-router-dom";
import { Stack, VStack, Heading, Text, Button, Image, Box, HStack } from "@chakra-ui/react";
import "./Home.css";
import homeImage from "../../assets/images/home-bg.png";
import { CgGoogle, CgYoutube } from "react-icons/cg";
import { SiCoursera, SiUdemy } from "react-icons/si";
import { DiAws } from "react-icons/di";

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
                    <Heading children="LEARN FROM THE EXPERTS" size="2xl" />
                    <Text textAlign={["center","left"]} children="Find valuable content at reasonable prices!" fontSize={"20px"} />

                    <Link to="/courses">
                        <Button size={"lg"} colorScheme={"yellow"}>
                            Explore more
                        </Button>
                    </Link>
                </VStack>

                <Image boxSize={"md"} src={homeImage} objectFit={"contain"} className="home-image" />
            </Stack>
        </div>

        <Box padding={"8"} bg={"blackAlpha.800"} >
            <Heading textAlign={"center"} fontFamily={"body"} color={"yellow.400"} children="Our Brands" />

            <HStack className="brands-banner" justifyContent={"space-evenly"} marginTop="4" >
                <CgGoogle />
                <CgYoutube />
                <SiCoursera />
                <SiUdemy />
                <DiAws />
            </HStack>
        </Box>

        <div className="video-container">
            <video
                autoPlay={true}
                controls
                loop
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
                disableRemotePlayback
            />
        </div>
    </section>
  )
}

export default Home