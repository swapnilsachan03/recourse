import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../redux/actions/profile';
import { getUser } from '../../redux/actions/user';

const UpdateProfile = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.profile);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    await dispatch(updateProfile({name, email}));
    dispatch(getUser());
    navigate("/profile");
  }

  return (
    <Container paddingY={"16"} minH={"90vh"}>
      <form onSubmit={submitHandler}>
        <Heading
          children="Update Profile"
          marginY={"16"}
          textAlign={["center", "left"]}
        />

        <VStack spacing={"8"}>
          <Input
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            type={"text"}
            focusBorderColor={"blue.500"}
          />
          
          <Input
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@gmail.com"
            type={"email"}
            focusBorderColor={"blue.500"}
          />

          <Button
            isLoading={loading}
            width={"full"}
            colorScheme={"blue"}
            type={"submit"}
          >
            Update Profile
          </Button>
        </VStack>
      </form>
    </Container>
  )
}

export default UpdateProfile