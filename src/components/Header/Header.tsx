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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./Header.scss";

function Header() {
  const { isAuthenticated } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      as="header"
      h="82px"
      alignItems="center"
      justifyContent="space-around"
    >
      <Show breakpoint="(max-width: 493px)">
        <Button
          className="icon"
          colorScheme="none"
          leftIcon={<img src="./src/assets/Burger.svg" alt="burger" />}
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
          <img className="icon" src="./src/assets/blyudo.png" alt="Blyudo" />
        </Link>
        <Link to="/">Blyudo</Link>
      </Flex>
      <Hide breakpoint="(max-width: 493px)">
        <Flex className="links" gap="1em">
          <Link to="/">Main</Link>
          <Link to="/catalog">Catalog</Link>
          <Link to="/about">About</Link>
        </Flex>
      </Hide>
      <Flex gap="1em" alignItems="center">
        <Link to="/profile">
          <img className="icon" src="./src/assets/Avatar.svg" alt="profile" />
        </Link>
        <Link to="/basket">
          <img
            className="icon"
            src="./src/assets/Shopping cart.svg"
            alt="basket"
          />
        </Link>
        {isAuthenticated ? (
          <Button>Sign Out</Button>
        ) : (
          <Flex gap="1em">
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default Header;
