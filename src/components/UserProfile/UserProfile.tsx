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
  IconButton,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import getUserProfile from "../../services/getUser";
import {
  birthDateValidation,
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  passwordValidation,
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
  password: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  version: number;
  addresses: Address[];
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
}

interface PasswordChangeFormData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

function UserProfile() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [, setEditedUser] = useState<UserData | null>(null);
  const [isPasswordChangeMode, setIsPasswordChangeMode] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserData>();

  const { register: registerPassword, handleSubmit: handleSubmitPassword, formState: { errors: passwordErrors } } =
    useForm<PasswordChangeFormData>();

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
    if (user) {
      reset(user);
    }
    setIsEditMode(true);
  };

  const handlePasswordChangeClick = () => {
    // resetPassword();
    setIsPasswordChangeMode(true);
  };

  const onSubmitPasswordChange = async (data: PasswordChangeFormData) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast({
        position: "top",
        title: "Error",
        description: "New passwords do not match.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const clientId = getClientIdFromLocalStorage();
      if (clientId === null) {
        throw new Error("Client ID is null");
      }

      const updatePasswordDetails = {
        id: clientId,
        version: user?.version,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      };

      await ClientCredentialsFlowApiClient()
        .customers()
        .password()
        .post({ body: updatePasswordDetails })
        .execute();

      toast({
        position: "top",
        title: "Password updated",
        description: "Your password has been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setIsPasswordChangeMode(false);
    } catch (error) {
      console.log("Error updating password:", error);
      toast({
        position: "top",
        title: "Error",
        description: "There was an error updating your password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onSubmit = async (data: UserData) => {
    try {
      const clientId = getClientIdFromLocalStorage();
      if (clientId === null) {
        throw new Error("Client ID is null");
      }

      const updateCustomerDetails = {
        version: data.version,
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
            action: "changeEmail",
            email: data.email,
          },
          {
            action: "setDateOfBirth",
            dateOfBirth: data.dateOfBirth,
          },
        ],
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

            <Box>
              <Heading as="h2" size="md" mb={2}>
                Personal Information
              </Heading>
              <Button onClick={handleEditClick}>Edit Profile</Button>
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

            <Button onClick={handlePasswordChangeClick}>Change Password</Button>

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
                    type="date"
                  />
                  <FormErrorMessage>
                    {errors.dateOfBirth?.message}
                  </FormErrorMessage>
                </FormControl>
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

      <Modal
        isOpen={isPasswordChangeMode}
        onClose={() => setIsPasswordChangeMode(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmitPassword(onSubmitPasswordChange)}>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isInvalid={!!passwordErrors.currentPassword?.message} isRequired>
                  <FormLabel mt={5}>Current Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      placeholder="Current Password"
                      {...registerPassword(
                        "currentPassword",
                        passwordValidation,
                      )}
                    />
                    <InputRightElement width="4rem">
                      <IconButton
                        h="95%"
                        aria-label="Search database"
                        bg="white"
                        onClick={handleClick}
                      >
                        {show ? <ViewIcon /> : <ViewOffIcon />}
                      </IconButton>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {passwordErrors.currentPassword?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!passwordErrors.newPassword?.message} isRequired>
                  <FormLabel>New Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="New Password"
                    {...registerPassword("newPassword", passwordValidation)}
                  />
                  <FormErrorMessage>
                    {passwordErrors.newPassword?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!passwordErrors.confirmNewPassword?.message} isRequired>
                  <FormLabel>Confirm New Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Confirm New Password"
                    {...registerPassword(
                      "confirmNewPassword",
                      passwordValidation,
                    )}
                  />
                  <FormErrorMessage>
                    {passwordErrors.confirmNewPassword?.message}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Save
              </Button>
              <Button
                variant="ghost"
                onClick={() => setIsPasswordChangeMode(false)}
              >
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
