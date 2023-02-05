import { Box, Button, Grid, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { fileUploadCSS } from "../../../assets/fileUploadCSS";

const CourseModal = ({
  id,
  courseTitle,
  lectures = [],
  isOpen,
  onClose,
  deleteLectureHandler,
  addLectureHandler
}) => {

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [video, setVideo] = useState();
  const [videoPrev, setVideoPrev] = useState();

  const changeVideoHandler = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    }
  }

  const modalCloseHandler = () => {
    setTitle("");
    setDescription("");
    setVideo("");
    setVideoPrev("");
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={modalCloseHandler}
      size={"full"}
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> {courseTitle} </ModalHeader>
        <ModalCloseButton onClick={modalCloseHandler} />

        <ModalBody padding={"16"}>
          <Grid templateColumns={["1fr", "3fr 1fr"]}>
            <Box paddingX={["0", "16"]}>
              <Box marginY={"5"}>
                <Heading children={courseTitle} />
                <Heading children={`#${id}`} size={"sm"} opacity={0.4} />
              </Box>

              <Heading children="Lectures" size={"lg"} />
              <VideoCard
                title="Introduction to react"
                description="The frist video of the course where we'll study the basics of React"
                num={1}
                lectureId={"8382lecture"}
                courseId={id}
                deleteLectureHandler={deleteLectureHandler}
                addLectureHandler={addLectureHandler}
              />
            </Box>

            <Box>
              <form onSubmit={(e) => {addLectureHandler(e, id, title, description, video)}}>
                <VStack spacing={"4"}>
                  <Heading children="Add Lecture" size={"md"} />

                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  
                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <Input 
                    accept="video/mp4"
                    required
                    type={"file"}
                    focusBorderColor={"purple.300"}
                    css={{
                      "&::file-selector-button": {
                        ...fileUploadCSS, color:"purple"
                      }
                    }}
                    onChange={changeVideoHandler}
                  />

                  { videoPrev && (
                    <video
                      controlsList='nodownload'
                      controls
                      src={videoPrev}
                    />
                  )}

                  <Button
                    width={"full"}
                    colorScheme={"purple"}
                    type={"submit"}
                  />
                </VStack>
              </form>
            </Box>

          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button onClick={modalCloseHandler}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CourseModal

const VideoCard = ({title, description, num, lectureId, courseId, deleteLectureHandler, addLectureHandler}) => {
  return (
    <Stack
      direction={["column", "row"]}
      marginY="8"
      borderRadius={"lg"}
      boxShadow={"0 0 10px rgba(107, 70, 193, 0.5)"}
      justifyContent={["flex-start", "space-between"]}
      padding={["4", "8"]}
    >
      <Box>
        <Heading size="sm" children={`#${num} ${title}`} />
        <Text children={description} />
      </Box>

      <Button
        color={"purple.600"}
        onClick={() => deleteLectureHandler(courseId, lectureId)}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  )
}