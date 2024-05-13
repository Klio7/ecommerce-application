import React from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.scss";

function NotFoundPage() {
  const history = useNavigate();

  return (
    <Box as="main" position="relative">
      <Image src="./src/assets/pic4.png" />
      <Flex className="not-found-msg">
        <Text className="big-text">404</Text>
        <Text className="big-text">Page Not Found</Text>
        <Button onClick={() => history(-1)} colorScheme="gray" marginTop="1em">
          Go back
        </Button>
      </Flex>
    </Box>
  );
}

export default NotFoundPage;
