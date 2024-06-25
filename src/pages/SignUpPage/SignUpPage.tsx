import React from "react";
import { Container, Text, Center, Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import SignUpForm from "../../components/SignUp/SignUpForm";

function SignUpPage() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <Center bg="grey.300" bgGradient="radial(blackAlpha.200, whiteAlpha.50)">
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
            Are you already registered?{" "}
            <ChakraLink color="red" as={ReactRouterLink} to="/signin">
              Sign In
            </ChakraLink>
          </Text>
        </Center>
        <SignUpForm />
      </Container>
    </Center>
  );
}
export default SignUpPage;
