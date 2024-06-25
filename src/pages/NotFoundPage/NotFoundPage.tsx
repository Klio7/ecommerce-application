import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.scss";

function NotFoundPage() {
  const history = useNavigate();

  return (
    <Box as="main" position="relative">
      <img
        className="not-found-page-pic"
        src="images/pictures/not_found_page_pic.png"
        alt=""
      />
      <Flex className="not-found-msg">
        <Text className="big-text">404</Text>
        <Text className="big-text">Page Not Found</Text>
        <Button onClick={() => history(-1)} colorScheme="gray" marginTop="1em">
          Go back
        </Button>
        <Button onClick={() => history("/")} colorScheme="gray" marginTop="1em">
          Main
        </Button>
      </Flex>
    </Box>
  );
}

export default NotFoundPage;
