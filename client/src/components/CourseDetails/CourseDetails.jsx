import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getCourseLectures } from '../../redux/actions/course';
import Loader from "../Layout/Loader";

const CoursePage = ({ user }) => {
  const [lectureNumber, setLectureNumber] = useState(0);
  
  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    dispatch(getCourseLectures(params.id));
  }, [dispatch, params.id]);

  const { lectures, loading } = useSelector(state => state.courses);

  if (
    user.role !== 'admin' &&
    (user.subscription === undefined || user.subscription.status !== 'active')
  ) {
    return <Navigate to={'/subscribe'} />;
  }

  return loading ? (
    <Loader />
  ) : (
    <>
    <Heading
      children={"All Lectures"}
      textAlign={"center"}
      size={"2xl"}
      fontWeight={"bold"}
      fontFamily={"Poppins"}
      my={"12"}
    />
    
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      {lectures && lectures.length > 0 ? (
        <>
          <Box>
            <video
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              src={lectures[lectureNumber].video.url}
              width="100%"
            ></video>

            <Heading
              children={`#${lectureNumber + 1} ${
                lectures[lectureNumber].title
              }`}
              m={'4'}
            />
            <Heading children="Description" m={'4'} />

            <Text m={'4'} children={lectures[lectureNumber].description} />
          </Box>

          <VStack>
            {lectures.map((item, index) => (
              <button
                onClick={() => setLectureNumber(index)}
                key={item._id}
                style={{
                  width: '100%',
                  padding: '1rem',
                  textAlign: 'center',
                  margin: 0,
                  borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
                  borderTop: '1px solid rgba(0, 0, 0, 0.2)',
                }}
              >
                <Text noOfLines={1}>
                  #{index + 1} {item.title}
                </Text>
              </button>
            ))}
          </VStack>
        </>
      ) : (
        <Heading children="No Lectures Yet!" />
      )}
    </Grid>
    </>
  );
};

export default CoursePage;