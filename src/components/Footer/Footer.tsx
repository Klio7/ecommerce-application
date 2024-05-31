import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Flex
      as="footer"
      w="100%"
      h="86px"
      bg="#3A3845"
      color="#A6A6A8"
      justifyContent="center"
      alignItems="center"
      gap="2em"
      pos="absolute"
      top="100%"
      px="15px"
    >
      <Link to="https://rs.school/">
        <Text
          align="center"
          transition="0.3s linear all"
          _hover={{
            color: "white",
          }}
        >
          Rolling Scopes
        </Text>
      </Link>
      <Flex gap="0.1em" direction={["column", "row", "row", "row"]}>
        <Link to="https://github.com/Klio7">
          <Text
            align="center"
            transition="0.3s linear all"
            _hover={{
              color: "white",
            }}
          >
            Klio7,
          </Text>
        </Link>
        <Link to="https://github.com/AlexeyArhangelskiy">
          <Text
            align="center"
            transition="0.3s linear all"
            _hover={{
              color: "white",
            }}
          >
            AlexeyArhangelskiy,
          </Text>
        </Link>
        <Link to="https://github.com/kaliganoff">
          <Text
            align="center"
            transition="0.3s linear all"
            _hover={{
              color: "white",
            }}
          >
            kaliganoff
          </Text>
        </Link>
      </Flex>
      <Text>2024</Text>
    </Flex>
  );
}

export default Footer;
