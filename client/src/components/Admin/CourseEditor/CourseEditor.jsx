import { Box, Button, Grid, Heading, HStack, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri';
import Sidebar from '../Sidebar'
import CourseModal from './CourseModal';

const CourseEditor = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const courses = [
    {
      _id: "y732y7",
      poster: {
        url: "https://cdn.pixabay.com/photo/2023/01/09/12/49/ferns-7707348_960_720.jpg"
      },
      title: "React Course",
      category: "Web Development",
      createdBy: "Swapnil Sachan aur falana dhimkana",
      views: 6321,
      numOfVideos: 12
    },
  ];

  const courseDetailsHandler = (userId) => {
    onOpen();
  }

  const deleteCourseHandler = (userId) => {
    console.log(userId);
  }

  const deleteLectureHandler = ({courseId, lectureId}) => {
    console.log(courseId);
    console.log(lectureId);
  }

  const addLectureHandler = ({e, courseId, title, description, video}) => {
    e.preventDefault();
  }

  return (
    <Grid
      minH={"100vh"}
      templateColumns={["1fr", "5fr 1fr"]}
    >
      <Box padding={["0", "8"]} overflowX={"auto"}>
        <Heading
          children="All Courses"
          textAlign={["center", "left"]}
          marginY={"16"}
        />

        <TableContainer width={["100vw", "full"]}>
          <Table variant={"simple"} size="lg">

            <TableCaption>
              All registered courses in the DB
            </TableCaption>

            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Poster</Th>
                <Th>Course Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {
                courses.map((element, index) => {
                  return (
                    <Row
                      key={index}
                      element={element}
                      courseDetailsHandler={courseDetailsHandler}
                      deleteCourseHandler={deleteCourseHandler}
                    />
                  )
                })
              }
            </Tbody>

          </Table>
        </TableContainer>

        <CourseModal
          id={courses[0]._id}
          courseTitle={courses[0].title}
          isOpen={isOpen}
          onClose={onClose}
          deleteLectureHandler={deleteLectureHandler}
          addLectureHandler={addLectureHandler}
        />
      </Box>

      <Sidebar />
    </Grid>
  )
}

const Row = ({element, courseDetailsHandler, deleteCourseHandler}) => {
  return (
    <Tr>
      <Td>{element._id}</Td>
      <Td><Image src={element.poster.url}/></Td>
      <Td>{element.title}</Td>
      <Td>{element.category}</Td>
      <Td>{element.createdBy}</Td>

      <Td isNumeric>{element.views}</Td>
      <Td isNumeric>{element.numOfVideos}</Td>
      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          
          <Button variant={"outline"} color={"purple.500"} onClick={() => courseDetailsHandler(element._id)}>
            View Lectures
          </Button>

          <Button color={"purple.600"} onClick={() => deleteCourseHandler(element._id)}>
            <RiDeleteBin7Fill />
          </Button>

        </HStack>
      </Td>

    </Tr>
  )
}

export default CourseEditor