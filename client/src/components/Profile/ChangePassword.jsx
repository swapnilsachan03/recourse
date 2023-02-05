import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <Container paddingY={"16"} minH={"90vh"}>
      <form>
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
            focusBorderColor={"yellow.500"}
          />
          
          <Input 
            required
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            type={"password"}
            focusBorderColor={"yellow.500"}
          />

          <Button width={"full"} colorScheme={"yellow"} type={"submit"}>
            Update Password
          </Button>
        </VStack>
      </form>
    </Container>
  )
}

export default ChangePassword