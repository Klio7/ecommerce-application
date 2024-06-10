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
          backgroundColor="mainBrown"
          border="2px solid"
          borderColor="mainBrown"
          fontWeight="400"
          py="20px"
          transition="0.3s linear all"
          _hover={{
            backgroundColor: "#694D37",
          }}
        >
          Continue shopping
        </Button>
      </Link>
    </Flex>
  );
}

export default EmptyCart;
