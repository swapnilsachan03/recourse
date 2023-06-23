import { Button, Container, Grid, Heading, Image, Input, Select, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { fileUploadCSS } from "../../../assets/fileUploadCSS";
import { createCourse } from "../../../redux/actions/admin";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const CreateCourse = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [createdBy, setCreatedBy] = useState();
  const [category, setCategory] = useState();
  const [image, setImage] = useState();
  const [imagePrev, setImagePrev] = useState();

  const categories = ["Web Development", "Artificial Intelligence", "Data Structures & Algorithms", "Data Science", "App Development"]

  const changeImageHandler = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    }
  }

  const dispatch = useDispatch();

  const { loading, error, message } = useSelector(state => state.admin);

  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('category', category);
    myForm.append('createdBy', createdBy);
    myForm.append('file', image);

    dispatch(createCourse(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [error, message, dispatch]);

  return (
    <Grid
      cursor={"pointer"}
      minH={"100vh"}
      templateColumns={["1fr", "5fr 1fr"]}
    >
      <Container paddingY={"10"}>
        <form onSubmit={submitHandler}>
          <Heading
            children="Create Course"
            textAlign={'center'}
            marginY={"16"}
            fontFamily={"Poppins"}
          />

          <VStack margin={"auto"} spacing={"8"}>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Course title"
              type={"text"}
              focusBorderColor={"purple.300"}
            />

            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Course description"
              type={"text"}
              focusBorderColor={"purple.300"}
            />
            
            <Input
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              placeholder="Creator name"
              type={"text"}
              focusBorderColor={"purple.300"}
            />

            <Select
              value={category}
              focusBorderColor={"purple.300"}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Category</option>

              {
                categories.map((element) => {
                  return (
                    <option value={element}> {element} </option>
                  );
                })
              }
            </Select>

            <Input 
              accept="image/*"
              required
              type={"file"}
              focusBorderColor={"purple.300"}
              css={{
                "&::file-selector-button": {
                  ...fileUploadCSS, color:"purple"
                }
              }}
              onChange={changeImageHandler}
            />

            { imagePrev && (
              <Image src={imagePrev} width="full" objectFit={"cover"} borderRadius={"md"} />
            )}

            <Button
              width={"full"}
              colorScheme={"purple"}
              type={"submit"}
              isLoading={loading}
            >
              Create Course
            </Button>
          </VStack>
        </form>
      </Container>

      <Sidebar />
    </Grid>
  )
}

export default CreateCourse