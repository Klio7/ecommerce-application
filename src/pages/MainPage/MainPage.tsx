import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "./MainPage.scss";

function MainPage() {
  return (
    <Box as="main" position="relative">
      <img
        className="main_page_pic"
        src="images\pictures\main_page_pic.png"
        alt=""
      />
      <Flex as="aside" className="sidebar">
        <Link to="/">Main Page</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
      </Flex>
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
