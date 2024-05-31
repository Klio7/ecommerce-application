import React from "react";
import { Container, Center } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import UserProfile from "../../components/UserProfile/UserProfile";
import useAuth from "../../hooks/useAuth";

function ProfilePage() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
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
        <UserProfile />
      </Container>
    </Center>
  );
}
export default ProfilePage;
