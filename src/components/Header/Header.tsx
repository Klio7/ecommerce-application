import React, { useContext, useEffect } from "react";
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
  useToast,
  Box,
} from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  getCartIdFromLocalStorage,
  removeCartIdFromLocalStorage,
} from "../../store/LocalStorage";
import "./Header.scss";
import { CartContext } from "../../contexts/CartContext";
import getCartProductIds from "../../services/getCartProductIds";

function Header() {
  const { isAuthenticated, setAuth } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cartItemsCount, setCartItemsCount } = useContext(CartContext);
  const cartId = getCartIdFromLocalStorage();
  const toast = useToast();

  useEffect(() => {
    async function getCart(cardId: string) {
      try {
        const data = await getCartProductIds(cardId);
        setCartItemsCount(data[0].length);
      } catch (error) {
        if (error instanceof Error) {
          toast({
            position: "top",
            title: "Sorry!",
            description: `${error.message}`,
            status: "error",
            duration: 6000,
            isClosable: true,
          });
        }
      }
    }
    if (cartId !== null) {
      getCart(cartId);
    }
  }, [cartId, setCartItemsCount, toast]);

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
          leftIcon={<img src="/images/icons/Burger.svg" alt="burger" />}
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
          <img className="icon" src="/images/icons/blyudo.png" alt="Blyudo" />
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
                src="/images/icons/Avatar.svg"
                alt="profile"
              />
            </Tooltip>
          </Link>
        ) : null}
        <Box position="relative">
          <Link to="/cart">
            <Tooltip label="Cart" font-size="lg" openDelay={300}>
              <img
                className="icon"
                src="/images/icons/Shopping cart.svg"
                alt="basket"
              />
            </Tooltip>
          </Link>
          <Text
            pos="absolute"
            top="50%"
            left="70%"
            border="black"
            borderRadius="50%"
            h="1.3em"
            w="1.3em"
            textAlign="center"
            bgColor="#ded6cb"
            fontSize=".9em"
          >
            {cartItemsCount}
          </Text>
        </Box>
        {isAuthenticated ? (
          <Tooltip label="Sign out" font-size="lg" openDelay={300}>
            <IconButton
              aria-label="Search database"
              icon={<LuLogOut />}
              bg="white"
              onClick={() => {
                setAuth(false);
                removeCartIdFromLocalStorage();
              }}
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
