import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  StackDivider,
  Button,
  Modal,
  ModalFooter,
  ModalContent,
  ModalBody,
  useToast,
  Input,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  Spinner,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import getUserProfile from "../../services/getUser";
import {
  birthDateValidation,
  emailValidation,
  firstNameValidation,
  lastNameValidation,
} from "../../utils/validation";
import { getClientIdFromLocalStorage } from "../../store/LocalStorage";
import { ClientCredentialsFlowApiClient } from "../../services/apiClients";

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
  version: number;
  addresses: Address[];
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
}

function UserProfile() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [, setEditedUser] = useState<UserData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserData>();
  const toast = useToast();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await getUserProfile();
        setUser(response.body);
      } catch (error) {
        console.log(error);
      }
    }



    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setEditedUser(user);
    reset(user);
    setIsEditMode(true);
  };

  const onSubmit = async (data: UserData) => {
    try {
      const clientId = getClientIdFromLocalStorage();
      if (clientId === null) {
        throw new Error("Client ID is null");
      }

      const updateCustomerDetails = {
        version:  data.version,
        actions: [
          {
            action: "setFirstName",
            firstName: data.firstName,
          },
          {
            action: "setLastName",
            lastName: data.lastName,
          },
          {
            action: 'changeEmail',
            email: data.email,
          },
          {
            action: "setDateOfBirth",
            dateOfBirth: data.dateOfBirth,
          }
        ]
      };

      await ClientCredentialsFlowApiClient()
        .customers()
        .withId({ ID: clientId })
        .post({ body: updateCustomerDetails })
        .execute();

      toast({
        position: "top",
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    
    setUser(data);
    setIsEditMode(false);
  } catch (error) {
    console.log("Error updating profile:", error);
    toast({
      position: "top",
      title: "Error",
      description: "There was an error updating your profile.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
};

  return (
    <>
      {user ? (
        <Box p={5}>
          <VStack spacing={5} align="start">
            <Heading as="h1" size="lg">
              User Profile
            </Heading>
            <Button onClick={handleEditClick}>Edit Profile</Button>

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
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}

      <Modal isOpen={isEditMode} onClose={() => setIsEditMode(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User Profile</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.firstName} isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    placeholder="First Name"
                    {...register("firstName", firstNameValidation)}
                  />
                  <FormErrorMessage>
                    {errors.firstName?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!errors.lastName?.message}>
                  <FormLabel mt={5}>Last name</FormLabel>
                  <Input
                    {...register("lastName", lastNameValidation)}
                    type="lastName"
                    placeholder="Last name"
                  />
                  <FormErrorMessage>
                    {errors.lastName?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.email} isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="Email"
                    {...register("email", emailValidation)}
                  />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.dateOfBirth} isRequired>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    placeholder="Date of Birth"
                    {...register("dateOfBirth", birthDateValidation)}
                  />
                  <FormErrorMessage>
                    {errors.dateOfBirth?.message}
                  </FormErrorMessage>
                </FormControl>
                {/* Add inputs for addresses if needed */}
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Save
              </Button>
              <Button variant="ghost" onClick={() => setIsEditMode(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserProfile;
