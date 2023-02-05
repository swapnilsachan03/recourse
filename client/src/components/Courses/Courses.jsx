import { Button, Container, Heading, HStack, Image, Input, Stack, Text, VStack } from "@chakra-ui/react";
import { React, useState } from "react";
import { Link } from "react-router-dom";

const CourseCard = ({views, title, imageSrc, id, addToPlaylistHandler, creator, description, lectureCount}) => {
  return (
    <VStack className="course" alignItems={["center", "flex-start"]}>
      <Image src={imageSrc} boxSize="60" objectFit={"contain"} />
      
      <Heading 
        textAlign={["center", "left"]} 
        maxW="200px" 
        fontFamily={"sans-serif"} 
        size={"sm"} 
        noOfLines={"3"} 
        children={title}
      />
      <Text noOfLines={2} children={description} />

      <HStack>
        <Text 
          fontWeight={"bold"}
          children={"Creator: "}
        />
        
        <Text 
          fontFamily={"body"}
          children={creator}
        />
      </HStack>

      <Heading 
        textAlign={"center"}
        size={"xs"}
        children={`Lectures - ${lectureCount}`}
        textTransform={"uppercase"}
      />
      
      <Heading 
        textAlign={"center"}
        size={"xs"}
        children={`Views - ${views}`}
        textTransform={"uppercase"}
      />

      <Stack direction={["column", "row"]} alignItems="center">
        <Link to={`/course/${id}`}>
          <Button colorScheme={"yellow"}>
            Watch Now
          </Button>
        </Link>

        <Button 
          variant={"ghost"} 
          colorScheme={"yellow"}
          onClick={() => addToPlaylistHandler(id)}
        >
          Add to Playlist
        </Button>
      </Stack>
    </VStack>
  );
}

const Courses = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const addToPlaylistHandler = (id) => {
    console.log(id + " Added to playlist.");
  }

  const categories = ["Web Development", "Artificial Intelligence", "Data Structures & Algorithms", "Data Science", "App Development"];

  return (
    <Container minH={"95vh"} maxW={"container.lg"} paddingY="8">
      <Heading children="All Courses" m={"8"} />
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)} placeholder="Search a course..."
        type={"text"}
        focusBorderColor="yellow.500"
      />

      <HStack
        overflowX={"auto"} 
        paddingY="6" 
        css={{"&::-webkit-scrollbar": {display: "none"}}}
      >
        {
          categories.map((item, index) => {
            return (
              <Button key={index} onClick={() => setCategory(item)} minW={"60"}>
                <Text children={item} />
              </Button>
            )
          })
        }
      </HStack>

      <Stack
        direction={["column", "row"]}
        flexWrap="wrap"
        justifyContent={["flex-start", "space-evenly"]}
        alignItems={["center", "flex-start"]}
      >
        <CourseCard
          title="Sample"
          description="Sample description"
          views={23}
          imageSrc={"https://cdn.pixabay.com/photo/2023/01/09/12/49/ferns-7707348_960_720.jpg"}
          id={324}
          creator={"swapnil"}
          lectureCount={12}
          addToPlaylistHandler={addToPlaylistHandler}
        />
      </Stack>
    </Container>
  )
}

export default Courses