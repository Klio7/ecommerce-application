import React from "react";
import { Container, Text, Center, Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import SignInForm from "../../components/SignIn/SignInForm";

function SignInPage() {
  return (
    <Center bg="grey.300" bgGradient="radial(gray.400, gray.50)">
      <Container
        border="1px"
        borderColor="gray.400"
        borderRadius="5px"
        p="30px"
        bg="white"
        my="100px"
      >
        <Center>
          <Text>
            Not a member yet?{" "}
            <ChakraLink color="red" as={ReactRouterLink} to="/signup">
              Sign Up
            </ChakraLink>
          </Text>
        </Center>
        <SignInForm />
      </Container>
    </Center>
  );
}
export default SignInPage;
