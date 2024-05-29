import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  StackDivider,
} from "@chakra-ui/react";
import getUserProfile from "../../services/getUser";

interface Address {
  id: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  addresses: Address[];
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
}

function UserProfile() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await getUserProfile();
        setUser(response.body);
        console.log(response);
        console.log(response.body.email);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserData();
  }, []);

  return (
    <div>
      {user ? (
        <Box p={5}>
          <VStack spacing={5} align="start">
            <Heading as="h1" size="lg">
              User Profile
            </Heading>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                Personal Information
              </Heading>
              <Text>
                <b>First Name:</b> {user?.firstName || "Not provided"}
              </Text>
              <Text>
                <b>Last Name:</b> {user?.lastName || "Not provided"}
              </Text>
              <Text>
                <b>Date of Birth:</b> {user?.dateOfBirth || "Not provided"}
              </Text>
            </Box>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                Addresses
              </Heading>
              {user?.addresses?.length > 0 ? (
                <VStack
                  spacing={3}
                  align="stretch"
                  divider={<StackDivider borderColor="gray.200" />}
                >
                  {user.addresses.map((address: Address) => (
                    <Box
                      key={address.id}
                      p={3}
                      borderWidth="1px"
                      borderRadius="md"
                      bg={
                        address.id === user.defaultBillingAddressId ||
                        address.id === user.defaultShippingAddressId
                          ? "gray.100"
                          : "white"
                      }
                    >
                      <HStack justify="space-between">
                        <VStack align="start" spacing={0}>
                          <Text>{address.streetName}</Text>
                          <Text>
                            {address.city}, {address.postalCode}
                          </Text>
                          <Text>{address.country}</Text>
                        </VStack>
                        <VStack align="end">
                          {address.id === user.defaultBillingAddressId && (
                            <Badge colorScheme="green">Default Billing</Badge>
                          )}
                          {address.id === user.defaultShippingAddressId && (
                            <Badge colorScheme="blue">Default Shipping</Badge>
                          )}
                        </VStack>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              ) : (
                <Text>No addresses saved.</Text>
              )}
            </Box>
          </VStack>
        </Box>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserProfile;
