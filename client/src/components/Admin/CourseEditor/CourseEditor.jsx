import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import Sidebar from '../Sidebar';
import CourseModal from './CourseModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses, getCourseLectures } from '../../../redux/actions/course';
import { addLecture, deleteCourse, deleteLecture } from '../../../redux/actions/admin';
import { toast } from 'react-hot-toast';

const AdminCourses = () => {
  const { courses, lectures } = useSelector((state) => state.courses);
  const { loading, error, message } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [courseId, setCourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('');

  const courseDetailsHandler = (courseId, title) => {
    dispatch(getCourseLectures(courseId));
    onOpen();
    setCourseId(courseId);
    setCourseTitle(title);
  };

  const deleteButtonHandler = courseId => {
    dispatch(deleteCourse(courseId));
  };

  const deleteLectureHandler = async (courseId, lectureId) => {
    await dispatch(deleteLecture(courseId, lectureId));
    dispatch(getCourseLectures(courseId));
  };

  const addLectureHandler = async (
    e,
    courseId,
    title,
    description,
    video
  ) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('file', video);

    await dispatch(addLecture(courseId, myForm));
    dispatch(getCourseLectures(courseId));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
    }
    dispatch(getAllCourses());
  }, [dispatch, error, message]);

  return (
    <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
      <Box p={['0', '8']} overflowX="auto">
        <Heading
          children="All Courses"
          my={'16'}
          textAlign={"center"}
          fontFamily={"Poppins"}
        />

        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size="lg">
            <TableCaption>All available courses in the database</TableCaption>

            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses.map(item => (
                <Row
                  key={item._id}
                  item={item}
                  courseDetailsHandler={courseDetailsHandler}
                  deleteButtonHandler={deleteButtonHandler}
                  loading={loading}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          deleteLectureHandler={deleteLectureHandler}
          addLectureHandler={addLectureHandler}
          id={courseId}
          courseTitle={courseTitle}
          lectures={lectures}
          loading={loading}
        />
      </Box>

      <Sidebar />
    </Grid>
  );
};

export default AdminCourses;

function Row({ item, courseDetailsHandler, deleteButtonHandler, loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} />
      </Td>
      <Td>{item.title}</Td>
      <Td>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            variant={'outline'}
            color="purple.500"
            onClick={() => courseDetailsHandler(item._id, item.title)}
          >
            View Lectures
          </Button>
          <Button
            color={'purple.600'}
            onClick={() => deleteButtonHandler(item._id)}
            isLoading={loading}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}