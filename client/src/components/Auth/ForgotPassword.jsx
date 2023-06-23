import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/actions/profile';
import { toast } from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  
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
    dispatch(forgetPassword(email))
  }

  return (
    <Container paddingY={"16"} height="100vh">
      <form onSubmit={submitHandler}>
        <Heading children="Enter Your E-mail" marginY={"16"} textAlign={"center"} />

        <VStack>
          <Input 
            required
            id="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@gmail.com"
            type={"email"}
            focusBorderColor={"blue.500"}
          />
        
        <Button
          isLoading={loading}
          type="submit"
          w="full"
          colorScheme={"blue"}
        >
          Send Reset Link
        </Button>

        </VStack>
      </form>
    </Container>
  )
}

export default ForgotPassword