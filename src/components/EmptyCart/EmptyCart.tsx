import React from "react";
import { Flex, Text, Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <Flex
      direction="column"
      borderTop="2px solid"
      borderColor="footerColorDark"
      w="100%"
      h="100vh"
      align="center"
    >
      <Text fontSize="2xl" mt="20px">
        Your cart is empty.
      </Text>
      <Image src="images\pictures\empty.webp" boxSize="md" m="10px" />
      <Link to="/catalog">
        <Button
          color="white"
          backgroundColor="footerColorDark"
          borderRadius="0"
          fontWeight="400"
          py="20px"
          px="40px"
          transition="0.3s linear all"
          _hover={{
            backgroundColor: "#694D37",
          }}
        >
          SHOP NOW!
        </Button>
      </Link>
    </Flex>
  );
}

export default EmptyCart;
