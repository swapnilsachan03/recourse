import { Avatar, Box, Button, Container, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiSecurePaymentFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { data as termsAndConditions } from "../../assets/docs/termsAndConditions";

const Founder = () => {
  return (
    <Stack
      direction={["column", "row"]}
      spacing={["4", "16"]}
      padding={"8"}
    >
      <VStack>
        <Avatar src="https://avatars.githubusercontent.com/u/63530845?v=4" boxSize={["40", "48"]} />
        <Text children={"Co-founder"} opacity={0.75} />
      </VStack>

      <VStack justifyContent={"center"} alignItems={["center", "flex-start"]}>
        <Heading children={"Swapnil Sachan"} size={["md", "lg"]} fontWeight={"light"} />
        
        <Text
          textAlign={["center", "left"]}
          children={"Hi! I am a full-stack developer and a second-year student at Chandigarh University. This website's mission is to provide quality education at a reasonable price."}
          fontSize={"sm"}
        />
      </VStack>
    </Stack>
)};

const VideoPlayer = () => {
  return (
    <Box className="video-container">
      <video
        src='/video/intro.mp4'
        autoPlay={true}
        muted
        controls
        loop
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
      />
    </Box>
)};

const TandC = (props) => {
  return (
    <Box>
      <Heading
        size={"md"}
        children={"Terms & Conditions"}
        textAlign={["center", "left"]}
        marginY={"4"}
      />

      <Box height="sm" padding="4" overflowY={"scroll"}>
        <Text 
          textAlign={["center", "left"]} 
          letterSpacing={"widest"}
          fontFamily={"heading"}
          children={props.termsAndConditions}
        />

        <Heading
          marginY={"xs"}
          size={"xs"}
          children="Refund only applicable for purchases made within 7 days."
        />
      </Box>
    </Box>
  )
}

const About = () => {
  return (
    <Container maxWidth={"container.lg"} padding={"16"}>
      <Heading
        children="About Us"
        textAlign={"center"}
        size={"2xl"}
        fontWeight={"bold"}
        fontFamily={"Poppins"}
        my={"6"}
      />
      
      <Founder />

      <Stack margin="8" direction={["column", "row"]} alignItems="center">
        <Text textAlign={["center", "left"]}>
          We are a video streaming education platform with some premium courses available only for our premium users.
        </Text>

        <Link to="/subscribe">
          <Button variant={"outline"} colorScheme={"blue"}>
            Checkout our Pro plan.
          </Button>
        </Link>
      </Stack>

      <VideoPlayer />
      <TandC termsAndConditions={termsAndConditions} />

      <HStack paddingTop={"5"}>
        <RiSecurePaymentFill />
        <Heading
          size={"sm"} 
          fontFamily="sans-serif" 
          children={"Payment is secured by Razorpay"}
        />
      </HStack>
    </Container>
  )
}

export default About