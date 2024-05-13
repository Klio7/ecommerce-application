import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import "./NotFoundPage.scss"

function NotFoundPage() {
  return (
    <Box as="main" position="relative">
    <Image src="./src/assets/pic4.png" />
    <Flex className="not-found-msg" >
    <Text className="big-text">
        404
      </Text>
      <Text className="big-text">
        Page Not Found
      </Text>
    </Flex>
  </Box>
  );
}

export default NotFoundPage;
