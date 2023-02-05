import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import { React, useState } from 'react';

const CourseDetails = () => {
  const [lectureNumber, setLectureNumber] = useState(0);

  const lectures = [
    {
      _id: "32hrr2",
      title: "First video of the course",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum nisi quis eleifend quam adipiscing. Aliquam nulla facilisi cras fermentum. Netus et malesuada fames ac turpis egestas sed. Fermentum et sollicitudin ac orci phasellus. At imperdiet dui accumsan sit amet nulla facilisi morbi. Magna ac placerat vestibulum lectus. Eu tincidunt tortor aliquam nulla facilisi. Rhoncus urna neque viverra justo nec ultrices. Ut porttitor leo a diam. Quam id leo in vitae turpis massa sed elementum. Iaculis urna id volutpat lacus laoreet non curabitur gravida.",
      video: {
        publicId: "cvf",
        url: "https://vjngdjk.com"
      },
    },
    {
      _id: "32hrr2",
      title: "Second video of the course",
      description: "Description 2",
      video: {
        publicId: "cvf",
        url: "https://vjngdjk.com"
      },
    },
    {
      _id: "32hrr2",
      title: "Third video of the course",
      description: "Description 3",
      video: {
        publicId: "cvf",
        url: "https://vjngdjk.com"
      },
    },
  ]

  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  })

  return (
    <Grid minH={"85vh"} templateColumns={["1fr", "3fr 1fr"]}>
      <Box>
        <video
          width={"100%"}
          autoPlay={true}
          controls
          loop
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={`${lectures[lectureNumber].url}`}
        />

        <Heading margin={"4"} children={`#${lectureNumber + 1} ${lectures[lectureNumber].title}`} />
        <Heading margin={"4"} children="Description" size="md" />
        <Text margin="4" children={`${lectures[lectureNumber].description}`} />
      </Box>

      <VStack>
        {
          lectures.map((element, index) => {
            return (
              <button key={element._id}
              onClick={() => setLectureNumber(index)}
              style={{
                width: "100%",
                padding: "1rem",
                textAlign: "center",
                margin: 0,
                borderBottom: "1px solid rgba(0,0,0,0.2)"
              }}>
                <Text noOfLines={"1"} children={`#${index + 1} ${element.title}`} />
              </button>
            );
          })
        }
      </VStack>
    </Grid>
  )
}

export default CourseDetails