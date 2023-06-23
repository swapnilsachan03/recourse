import { Button, Container, Heading, HStack, Image, Input, Stack, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/actions/course";
import { addToPlaylist } from "../../redux/actions/profile";
import { toast } from "react-hot-toast";
import { getUser } from "../../redux/actions/user";

const CourseCard = ({views, title, imageSrc, id, addToPlaylistHandler, creator, description, lectureCount, loading}) => {
  return (
    <VStack
      className="course"
      alignItems={"flex-start"}
      gap={"1"}
      padding={"4"}
      bgColor={useColorModeValue("gray.100", "gray.800")}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.300", "gray.700")}
      borderRadius={"8"}
      boxShadow={"lg"}
      width={["90%", "70%", "40%", "30%"]}
    >
      <Image
        src={imageSrc}
        height={52}
        width={"full"}
        objectFit={"cover"}
        rounded={"md"}
        mb={2}
      />

      <VStack alignItems={"flex-start"}>
        <Heading
          textAlign={["center", "left"]}
          fontSize={"3xl"}
          fontWeight={"semibold"}
          noOfLines={"1"}
          children={title}
        />

        <Text
          textAlign={"center"}
          size={"sm"}
          children={`${views} views`}
          fontWeight={"medium"}
        />
      </VStack>
      
      <Text noOfLines={2} children={description} />

      <Text 
        textAlign={"center"}
        fontSize={"sm"}
        fontWeight={"light"}
        children={`${lectureCount} lectures available`}
      />

      <HStack>
        <Text
          fontWeight={"bold"}
          children={"Created by "}
        />
        
        <Text 
          fontFamily={"body"}
          children={creator}
        />
      </HStack>

      <Stack direction={["column", "row"]} alignItems="center">
        <Link to={`/course/${id}`}>
          <Button colorScheme={"blue"}>
            Watch Now
          </Button>
        </Link>

        <Button 
          variant={"outline"} 
          colorScheme={"blue"}
          onClick={() => addToPlaylistHandler(id)}
          isLoading={loading}
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
  const dispatch = useDispatch();

  const addToPlaylistHandler = async (courseId) => {
    await dispatch(addToPlaylist(courseId)); 
    dispatch(getUser());
  }

  const categories = ["Web Development", "Artificial Intelligence", "Data Structures & Algorithms", "Data Science", "App Development"];

  const { loading, courses, error, message } = useSelector(state => state.courses);

  useEffect(() => {
    dispatch(getAllCourses(category, keyword));

    if(error) {
      toast.error(error);
      dispatch({type: "clearError"});
    }
    if(message) {
      toast.success(message);
      dispatch({type: "clearMessage"});
    }
  }, [category, keyword, dispatch, error, message])

  return (
    <Container minH={"100vh"} maxW={"container.xl"} paddingY="8">
      <Heading
        children="All Courses"
        fontSize={"5xl"}
        my={"8"}
        textAlign={"center"}
        fontFamily={"Poppins"}
      />

      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)} placeholder="Search a course..."
        type={"text"}
        focusBorderColor="blue.500"
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
        {
          courses.length > 0 ? courses.map((item, index) => (
            <CourseCard
              key={item._id}
              title={item.title}
              description={item.description}
              views={item.views}
              imageSrc={item.poster.url}
              id={item._id}
              creator={item.createdBy}
              lectureCount={item.numOfVideos}
              addToPlaylistHandler={addToPlaylistHandler}
              loading={loading}
            />
          )) : (
            <Heading children="No courses found!" />
          )
        }
      </Stack>
    </Container>
  )
}

export default Courses