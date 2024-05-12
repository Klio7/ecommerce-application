import React from "react";
import { Box, Container, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <>
      <Box position="relative">
        <Image src="./src/assets/pic1.png" />
        <Flex
          paddingLeft="0.5em"
          top="0px"
          position="absolute"
          w="100px"
          h="100%"
          bg="#826F66"
          flexDirection="column"
        >
          <Link to="/">Main Page</Link>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </Flex>{" "}
      </Box>
      <Container />
    </>
  );
}

export default MainPage;
