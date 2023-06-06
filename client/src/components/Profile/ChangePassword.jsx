import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/actions/profile';
import toast from 'react-hot-toast';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const dispatch = useDispatch();
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(changePassword({oldPassword, newPassword}));
  }

  const { loading, message, error } = useSelector(state => state.profile);

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
  
  return (
    <Container paddingY={"16"} minH={"90vh"}>
      <form onSubmit={submitHandler}>
        <Heading
          children="Change Password"
          marginY={"16"}
          textAlign={["center", "left"]}
        />

        <VStack spacing={"8"}>
          <Input 
            required
            value={oldPassword} 
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Enter old password"
            type={"password"}
            focusBorderColor={"blue.500"}
          />
          
          <Input 
            required
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            type={"password"}
            focusBorderColor={"blue.500"}
          />

          <Button isLoading={loading} width={"full"} colorScheme={"blue"} type={"submit"}>
            Update Password
          </Button>
        </VStack>
      </form>
    </Container>
  )
}

export default ChangePassword