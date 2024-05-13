import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Flex as="footer" w="100%" h="86px" bg="#3A3845" color="#A6A6A8" justifyContent="center" alignItems="center" gap="2em">
        <Link to="https://rs.school/">Rolling Scopes</Link><Text><Link to="https://github.com/Klio7">Klio7</Link>, <Link to="https://github.com/AlexeyArhangelskiy">AlexeyArhangelskiy</Link>, <Link to="https://github.com/kaliganoff">kaliganoff</Link></Text><Text>2024</Text>
    </Flex>
  );
}

export default Footer;
