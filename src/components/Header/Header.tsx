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
      justifyContent="space-around"
    >
      <Show breakpoint="(max-width: 493px)">
        <Button
          className="icon"
          colorScheme="none"
          leftIcon={<img src="images/icons/Burger.svg" alt="burger" />}
          onClick={onOpen}
        />
      </Show>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody fontSize="1.5em">
            <List>
              <ListItem>
                <Link to="/">Main</Link>
              </ListItem>
              <ListItem>
                <Link to="/catalog">Catalog</Link>
              </ListItem>
              <ListItem>
                <Link to="/about">About</Link>
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
            fontSize={["xl", "2xl", "2xl", "2xl", "3xl"]}
            color="gray.800"
            transition="0.3s linear all"
            _hover={{
              transform: "scale(1.2)",
              transition: "0.3s linear all",
            }}
          >
            Blyudo
          </Text>
        </Link>
      </Flex>
      <Hide breakpoint="(max-width: 493px)">
        <Flex className="links" gap="1em">
          <Link to="/">
            <Text
              transition="0.3s linear all"
              _hover={{
                transform: "scale(1.2)",
                transition: "0.3s linear all",
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
                transition: "0.3s linear all",
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
                transition: "0.3s linear all",
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
            <Tooltip label="Your profile" font-size="lg">
              <img
                className="icon"
                src="images/icons/Avatar.svg"
                alt="profile"
              />
            </Tooltip>
          </Link>
        ) : null}
        <Link to="/basket">
          <Tooltip label="Cart" font-size="lg">
            <img
              className="icon"
              src="images/icons/Shopping cart.svg"
              alt="basket"
            />
          </Tooltip>
        </Link>
        {isAuthenticated ? (
          <Tooltip label="Sign out" font-size="lg">
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
                transition: "0.3s linear all",
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
                  transition: "0.3s linear all",
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
                  transition: "0.3s linear all",
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
