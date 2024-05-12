import React from "react";
import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Flex
      as="header"
      h="82px"
      alignItems="center"
      justifyContent="space-around"
    >
      <Flex align="center" gap="1em">
        <img src="./src/assets/blyudo.png" alt="" />
        Blyudo
      </Flex>
      <Flex gap="1em">
        <Link to="/">Main</Link>
        <Link to="/catalog">Catalog</Link>
        <Link to="/about">About</Link>
      </Flex>
      <Flex gap="1em" alignItems="center">
        <Link to="/profile">
          <img src="./src/assets/Avatar.svg" alt="" />
        </Link>
        <Link to="/basket">
          <img src="./src/assets/Shopping cart.svg" alt="" />
        </Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
      </Flex>
    </Flex>
  );
}

export default Header;
