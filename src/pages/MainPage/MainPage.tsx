import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./MainPage.scss";

function MainPage() {
  const { isAuthenticated } = useAuth();
  return (
    <Box as="main" position="relative">
      <Image src="./src/assets/pic1.png" />
      {isAuthenticated ? (
        <Text>Nothing</Text>
      ) : (
        <Flex as="aside" className="sidebar">
          <Link to="/">Main Page</Link>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </Flex>
      )}
      <Flex className="dinnerset-info">
        <Text className="normal-text">Handcrafted in Viet Nam since 1650</Text>
        <Text className="big-text">
          BAT TRANG
          <br />
          DINNER SET
        </Text>
      </Flex>
    </Box>
  );
}

export default MainPage;
