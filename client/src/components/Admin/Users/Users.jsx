import { Box, Button, Grid, Heading, HStack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri';
import Sidebar from '../Sidebar'

const Users = () => {
  const users = [
    {
      _id: "y732y7",
      name: "Swapnil",
      role: "admin",
      subscription: {
        status: "active"
      },
      email: "swapnil@gmail.com"
    },
    {
      _id: "y732y7",
      name: "Swapnil",
      role: "admin",
      subscription: {
        status: "active"
      },
      email: "swapnil@gmail.com"
    },
    {
      _id: "y732y7",
      name: "Swapnil",
      role: "admin",
      subscription: {
        status: "active"
      },
      email: "swapnil@gmail.com"
    },
  ];

  const changeRoleHandler = (userId) => {
    console.log(userId);
  }

  const deleteUserHandler = (userId) => {
    console.log(userId);
  }

  return (
    <Grid
      minH={"100vh"}
      templateColumns={["1fr", "5fr 1fr"]}
    >
      <Box padding={["0", "16"]} overflowX={"auto"}>
        <Heading
          children="All Users"
          textAlign={["center", "left"]}
          marginY={"16"}
        />

        <TableContainer width={["100vw", "full"]}>
          <Table variant={"simple"} size="lg">

            <TableCaption>
              All registered users in the DB
            </TableCaption>

            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Subscription</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {
                users.map((element, index) => {
                  return (
                    <Row
                      key={index}
                      element={element}
                      changeRoleHandler={changeRoleHandler}
                      deleteUserHandler={deleteUserHandler}
                    />
                  )
                })
              }
            </Tbody>

          </Table>
        </TableContainer>
      </Box>

      <Sidebar />
    </Grid>
  )
}

export default Users

const Row = ({element, changeRoleHandler, deleteUserHandler}) => {
  return (
    <Tr>
      <Td>{element._id}</Td>
      <Td>{element.name}</Td>
      <Td>{element.email}</Td>
      <Td>{element.role}</Td>
      <Td>{element.subscription.status === "active" ? "Active" : "Not Active"}</Td>

      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          
          <Button variant={"outline"} color={"purple.500"} onClick={() => changeRoleHandler(element._id)}>
            Change Role
          </Button>

          <Button color={"purple.600"} onClick={() => deleteUserHandler(element._id)}>
            <RiDeleteBin7Fill />
          </Button>

        </HStack>
      </Td>

    </Tr>
  )
}