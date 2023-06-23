import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, useDisclosure, VStack } from "@chakra-ui/react";
import React from "react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from "react-icons/ri"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/user";

const Header = ({ isAuthenticated = false, user }) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const SidebarButton = (props) => {
    return (
      <Link onClick={onClose} to={props.url}>
        <Button variant={"ghost"}>{props.title}</Button>
      </Link>
    );
  }

  const dispatch = useDispatch();

  const logoutHandler = () => {
    onClose();
    dispatch(logout());
  }

  return (
    <>
      <ColorModeSwitcher />
      <Button
        onClick={onOpen}
        colorScheme={"blue"}
        width={"12"}
        height={"12"}
        rounded={"full"}
        position={"fixed"}
        top={"6"}
        left={"6"}
      >
        <RiMenu5Fill />
      </Button>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay backdropFilter={"blur(10px)"} />
        
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1px"}>ReCourse</DrawerHeader>
          
          <DrawerBody>
            <VStack alignItems={"flex-start"}>

              <SidebarButton url="/" title="Home" />
              <SidebarButton url="/courses" title="All Courses" />
              <SidebarButton url="/request" title="Request a Course" />
              <SidebarButton url="/contact" title="Contact Us" />
              <SidebarButton url="/about" title="About" />

              <HStack
                justifyContent={"space-evenly"}
                position={"absolute"}
                bottom={"2rem"}
                width={"80%"}
              >
                {isAuthenticated ?
                  (<>
                    <VStack>
                      <HStack justifyContent={"center"}>

                        <Link onClick={onClose} to="/profile">
                          <Button colorScheme={"blue"}>Profile</Button>
                        </Link>

                        <Button variant={"outline"} colorScheme={"blue"} onClick={logoutHandler} >
                          <RiLogoutBoxLine style={{marginRight: "5px"}} /> Logout
                        </Button>

                      </HStack>

                      {
                        user && user.role==="admin" && (
                        <Link onClick={onClose} to="/admin/dashboard">
                          <Button colorScheme={"purple"} >
                            <RiDashboardFill style={{margin: "4px"}} />Dashboard
                          </Button>
                        </Link>)
                      }
                    </VStack>
                  </>) :

                  (<>
                    <Link onClick={onClose} to="/login">
                      <Button colorScheme={"blue"}>Login</Button>
                    </Link>

                    <p style={{fontStyle: "italic"}}>or</p>

                    <Link onClick={onClose} to="/register">
                      <Button colorScheme={"blue"}>Sign Up</Button>
                    </Link>
                  </>)
                }
              </HStack>
            </VStack>
          </DrawerBody>

        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Header