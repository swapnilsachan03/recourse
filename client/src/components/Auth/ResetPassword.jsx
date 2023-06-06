import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/profile';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const params = useParams();
  console.log(params.token);
  
  const { loading, message, error } = useSelector(state => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if(message) {
      toast.success(message)
      dispatch({ type: "clearMessage" })
    }
    
    if(error) {
      toast.error(error)
      dispatch({ type: "clearError" })
    }
  }, [dispatch, error, message])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(params.token, password));
  }

  return (
    <Container paddingY={"16"} height="85vh">
      <form onSubmit={submitHandler}>
        <Heading children="Reset Password" marginY={"16"} textAlign={"center"} />

        <VStack>
          <Input 
            required
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your new password"
            type={"password"}
            focusBorderColor={"blue.500"}
          />
        
        <Button
          isLoading={loading}
          type="submit"
          w="full"
          colorScheme={"blue"}
        >
          Update Password
        </Button>

        </VStack>
      </form>
    </Container>
  )
}

export default ResetPassword