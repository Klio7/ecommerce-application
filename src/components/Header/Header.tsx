import React from "react";
import {
  Flex,
  Button,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Show,
  Hide,
  ListItem,
  List,
  Text,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./Header.scss";

function Header() {
  const { isAuthenticated, setAuth } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      as="header"
      h="82px"
      w="100%"
      alignItems="center"
      justifyContent="space-between"
      px="7px"
    >
      <Show breakpoint="(max-width: 525px)">
        <Button
          className="icon"
          colorScheme="none"
          leftIcon={<img src="images/icons/Burger.svg" alt="burger" />}
          onClick={onOpen}
        />
      </Show>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent bg="#826F69" color="white">
          <DrawerCloseButton />
          <DrawerBody fontSize="1.5em" alignContent="center" textAlign="center">
            <List spacing="30px">
              <ListItem>
                <Link to="/">
                  <Text
                    onClick={onClose}
                    transition="0.3s"
                    borderBottom="2px solid transparent"
                    _hover={{ borderColor: " white" }}
                  >
                    Main
                  </Text>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/catalog">
                  <Text
                    onClick={onClose}
                    transition="0.3s"
                    borderBottom="2px solid transparent"
                    _hover={{ borderColor: " white" }}
                  >
                    Catalog
                  </Text>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/about">
                  <Text
                    onClick={onClose}
                    transition="0.3s"
                    borderBottom="2px solid transparent"
                    _hover={{ borderColor: " white" }}
                  >
                    About
                  </Text>
                </Link>
              </ListItem>
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Flex align="center" gap="1em">
        <Link to="/">
          <img className="icon" src="images/icons/blyudo.png" alt="Blyudo" />
        </Link>
        <Link to="/">
          <Text
            fontSize={["2xl", "2xl", "2xl", "2xl", "3xl"]}
            color="gray.800"
            transition="0.3s linear all"
            _hover={{
              transform: "scale(1.2)",
            }}
          >
            Blyudo
          </Text>
        </Link>
      </Flex>
      <Hide breakpoint="(max-width: 525px)">
        <Flex className="links" gap="1em">
          <Link to="/">
            <Text
              transition="0.3s linear all"
              _hover={{
                transform: "scale(1.2)",
              }}
            >
              Main
            </Text>
          </Link>
          <Link to="/catalog">
            <Text
              transition="0.3s linear all"
              _hover={{
                transform: "scale(1.2)",
              }}
            >
              Catalog
            </Text>
          </Link>
          <Link to="/about">
            <Text
              transition="0.3s linear all"
              _hover={{
                transform: "scale(1.2)",
              }}
            >
              About
            </Text>
          </Link>
        </Flex>
      </Hide>

      <Flex gap="1em" alignItems="center">
        {isAuthenticated ? (
          <Link to="/profile">
            <Tooltip label="Your profile" font-size="lg" openDelay={300}>
              <img
                className="icon"
                src="images/icons/Avatar.svg"
                alt="profile"
              />
            </Tooltip>
          </Link>
        ) : null}
        <Link to="/cart">
          <Tooltip label="Cart" font-size="lg" openDelay={300}>
            <img
              className="icon"
              src="images/icons/Shopping cart.svg"
              alt="basket"
            />
          </Tooltip>
        </Link>
        {isAuthenticated ? (
          <Tooltip label="Sign out" font-size="lg" openDelay={300}>
            <IconButton
              aria-label="Search database"
              icon={<LuLogOut />}
              bg="white"
              onClick={() => setAuth(false)}
              fontSize="18px"
              color="gray.600"
              transition="0.3s linear all"
              _hover={{
                transform: "scale(1.2)",
              }}
            />
          </Tooltip>
        ) : (
          <Flex gap="1em">
            <Link to="/signin">
              <Text
                transition="0.3s linear all"
                _hover={{
                  transform: "scale(1.2)",
                }}
              >
                Sign In
              </Text>
            </Link>
            <Link to="/signup">
              <Text
                transition="0.3s linear all"
                _hover={{
                  transform: "scale(1.2)",
                }}
              >
                Sign Up
              </Text>
            </Link>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default Header;
