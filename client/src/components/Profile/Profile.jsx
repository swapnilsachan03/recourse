import { Avatar, Button, Container, Heading, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { fileUploadCSS } from "../../assets/fileUploadCSS"

const Profile = () => {
  const user = {
    name: "Swapnil Sachan",
    email: "swapnil@gmail.com",
    joinedOn: String(new Date().toDateString()),
    role: "user",
    subscription: {
      status: "active"
    },
    playlist: [
      {
        course: "'hsh778", poster: "https://cdn.pixabay.com/photo/2023/01/09/12/49/ferns-7707348_960_720.jpg"
      }
    ]
  };

  const removeFromPlaylistHandler = (id) => {
    console.log(id);
  }

  const {isOpen, onOpen, onClose} = useDisclosure();

  const picSubmitHandler = (e, image) => {
    e.preventDefault();
    console.log("nothing");
  }

  return (
    <Container minH={"95vh"} maxW={"container.lg"} paddingY={"8"}>
      <Heading children={"Profile"} margin={"8"} />

      <Stack
        justifyContent={"center"}
        direction={["column", "row"]}
        alignItems={"center"}
        spacing={["8", "16"]}
        padding={"8"}
      >
        <VStack>
          <Avatar boxSize={"48"} />

          <Button onClick={onOpen} colorScheme={"yellow"} variant={"ghost"}>
            Change Photo
          </Button>
        </VStack>

        <VStack
          spacing={"4"}
          alignItems={["center", "flex-start"]}
        >
          <HStack>
            <Text children="Name: " fontWeight={"bold"} />
            <Text children={user.name} />
          </HStack>
          
          <HStack>
            <Text children="Email: " fontWeight={"bold"} />
            <Text children={user.email} />
          </HStack>
          
          <HStack>
            <Text children="Member since: " fontWeight={"bold"} />
            <Text children={user.joinedOn} />
          </HStack>

          { user.role !== "admin" && (
            <HStack>
              <Text children="Subscription status" fontWeight={"bold"} />
              {
                user.subscription.status === "active" ? (
                  <Button color={"yellow.500"} variant={"link"}>Cancel Subscription</Button>
                ) : (
                  <Link to="/subscribe">
                    <Button colorScheme={"yellow"}>Subscribe</Button>
                  </Link>
                )
              }
            </HStack>
          )}

          <Stack
            direction={["column", "row"]}
            alignItems={"center"}
          >
            <Link to="/update_profile">
              <Button>Update Profile</Button>
            </Link>
            
            <Link to={"/change_password"}>
              <Button>Change Password</Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>

      <Heading children={"Playlist"} size={"md"} marginY={"8"} />
      { user.playlist.length > 0 && (
        <Stack
          flexWrap={"wrap"}
          direction={["column", "row"]}
          alignItems={"center"}
          padding={"4"}
        >
          {
            user.playlist.map((element) => {
              return (
                <VStack width={"48"} margin={"2"} key={element.course}>
                  <Image boxSize={"full"} objectFit={"contain"} src={element.poster} />

                  <HStack>
                    <Link to={`/course/${element.course}`}>
                      <Button variant={"ghost"} colorScheme={"yellow"}>
                        Watch Now
                      </Button>
                    </Link>

                    <Button onClick={() => removeFromPlaylistHandler(element.course)}>
                      <RiDeleteBin7Fill />
                    </Button>
                  </HStack>
                </VStack>
              )
            }
          )}
        </Stack>
      )}

      <ChangeProfilePic picSubmitHandler={picSubmitHandler} isOpen={isOpen} onClose={onClose} />
    </Container>
  )
}

export default Profile

const ChangeProfilePic = ({isOpen, onClose, picSubmitHandler}) => {
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");

  const changeImageHandler = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    }
  }

  const modalCloseHandler = () => {
    onClose();
    setImage("");
    setImagePrev("");
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter={"blur(10px)"} />
      
      <ModalContent>
        <ModalHeader>
          Change Profile Picture
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <Container>
            <form onSubmit={(e) => picSubmitHandler(e, image)}>
              <VStack spacing={"8"}>
                { imagePrev && <Avatar src={imagePrev} boxSize={"48"} /> }

                <Input
                  type={"file"}
                  css={{"&::file-selector-button": fileUploadCSS}}
                  onChange={changeImageHandler}
                />

                <Button width={"full"} colorScheme={"yellow"} type={"submit"}>
                  Update
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>

        <ModalFooter>
          <Button marginRight={"3"} onClick={modalCloseHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}