import { Avatar, Button, Container, Heading, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fileUploadCSS } from "../../assets/fileUploadCSS"
import { removeFromPlaylist, updateProfilePicture } from '../../redux/actions/profile';
import { getUser } from '../../redux/actions/user';
import toast from "react-hot-toast";

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.profile);

  const removeFromPlaylistHandler = async (id) => {
    await dispatch(removeFromPlaylist(id));
    dispatch(getUser());
  }

  const imageSubmitHandler = (e, image) => {
    e.preventDefault();
    const myForm = new FormData();
    
    myForm.append("file", image);
    dispatch(updateProfilePicture(myForm));
    dispatch(getUser());
  }

  useEffect(() => {
    if(error) {
      toast.error(error);
      dispatch({ type: "clearError"});
    }

    if(message) {
      toast.success(message);
      dispatch({ type: "clearMessage"});
    }
  }, [dispatch, error, message]);

  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <Container minH={"100vh"} maxW={"container.lg"} paddingY={"8"}>
      <Heading
        children={"Profile"}
        marginY={"8"}
        fontSize={"5xl"}
        textAlign={"center"}
      />

      <Stack
        justifyContent={"center"}
        direction={["column", "row"]}
        alignItems={"center"}
        spacing={["8", "16"]}
        padding={"8"}
      >
        <VStack>
          <Avatar boxSize={"48"} src={user.avatar.url} />

          <Button
            onClick={onOpen}
            colorScheme={"blue"}
            variant={"ghost"}
          >
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
            <Text children={user.createdAt} />
          </HStack>

          { user.role !== "admin" && (
            <HStack>
              <Text children="Subscription status" fontWeight={"bold"} />
              {
                user.subscription && user.subscription.status === "active" ? (
                  <Button color={"blue.500"} variant={"link"}>Cancel Subscription</Button>
                ) : (
                  <Link to="/subscribe">
                    <Button colorScheme={"blue"}>Subscribe</Button>
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

      <hr/>

      <Heading
        children={"Playlist"}
        size={"lg"}
        marginY={"10"}
        fontWeight={"semibold"}
      />

      { user.playlist.length > 0 && (
        <Stack
          flexWrap={"wrap"}
          direction={["column", "row"]}
          alignItems={"center"}
        >
          {
            user.playlist.map((element) => {
              return (
                <VStack
                  width={"48"}
                  padding={"3"}
                  border={"1px"}
                  borderRadius={"md"}
                  key={element.course}
                  borderColor={"gray.400"}
                >
                  <Image
                    boxSize={"full"}
                    objectFit={"contain"}
                    src={element.poster}
                    borderRadius={"md"}
                  />

                  <HStack alignItems={"flex-start"}>
                    <Link to={`/course/${element.course}`}>
                      <Button variant={"outline"} colorScheme={"blue"}>
                        Watch Now
                      </Button>
                    </Link>

                    <Button isLoading={loading} onClick={() => removeFromPlaylistHandler(element.course)}>
                      <RiDeleteBin7Fill />
                    </Button>
                  </HStack>
                </VStack>
              )
            }
          )}
        </Stack>
      )}

      <ChangeProfilePic
        loading={loading}
        imageSubmitHandler={imageSubmitHandler}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Container>
  )
}

export default Profile

const ChangeProfilePic = ({isOpen, onClose, imageSubmitHandler, loading}) => {
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
            <form onSubmit={(e) => imageSubmitHandler(e, image)}>
              <VStack spacing={"8"}>
                { imagePrev && <Avatar src={imagePrev} boxSize={"48"} /> }

                <Input
                  type={"file"}
                  css={{"&::file-selector-button": fileUploadCSS}}
                  onChange={changeImageHandler}
                />

                <Button
                  isLoading={loading}
                  width={"full"}
                  colorScheme={"blue"}
                  type={"submit"}
                >
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