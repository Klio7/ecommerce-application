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
  Select,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import {
  Customer,
  CustomerChangePassword,
  CustomerUpdate,
  _BaseAddress,
} from "@commercetools/platform-sdk";
import getUserProfile from "../../services/getUser";
import {
  birthDateValidation,
  cityValidation,
  countryValidation,
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  passwordValidation,
  streetValidation,
  zipValidation,
} from "../../utils/validation";
import { getClientIdFromLocalStorage } from "../../store/LocalStorage";
import { ClientCredentialsFlowApiClient } from "../../services/apiClients";

interface PasswordChangeFormData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

type LoadingOverlayProps = {
  isLoading: boolean;
};

function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  if (!isLoading) {
    return null;
  }
  return (
    <Box
      background="gray.400"
      sx={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        opacity: 0.9,
        display: "flex",
        alignItems: "center",
        zIndex: "1600",
        justifyContent: "center",
      }}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Box>
  );
}

function UserProfile() {
  const [user, setUser] = useState<Customer | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPasswordChangeMode, setIsPasswordChangeMode] = useState(false);
  const [isAddAddressMode, setIsAddAddressMode] = useState(false);
  const [isEditAddressMode, setIsEditAddressMode] = useState(false);
  const [currentEditAddressIndex, setCurrentEditAddressIndex] =
    useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Customer>();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<PasswordChangeFormData>();

  const {
    register: registerAddAddress,
    handleSubmit: handleSubmitAddAddress,
    formState: { errors: addAddressErrors },
    reset: addAddressReset,
  } = useForm<_BaseAddress>();

  const {
    register: registerEditAddress,
    handleSubmit: handleSubmitEditAddress,
    formState: { errors: editAddressErrors },
    reset: editAddressReset,
  } = useForm<_BaseAddress>();

  const toast = useToast();

  useEffect(() => {
    async function fetchUserData() {
      try {
        setIsLoading(true);
        const response = await getUserProfile();
        setUser(response.body);
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, [toast]);

  const handleEditClick = () => {
    if (user) {
      reset(user);
    }
    setIsEditMode(true);
  };

  const handlePasswordChangeClick = () => {
    resetPassword();
    setIsPasswordChangeMode(true);
  };

  const handleAddAddressClick = () => {
    addAddressReset();
    setIsAddAddressMode(true);
  };

  const handleEditAddressClick = (addressId?: string) => {
    if (!addressId) {
      return;
    }
    const addressIndex =
      user?.addresses?.findIndex(
        (userAddress) => userAddress.id === addressId,
      ) || 0;
    editAddressReset();
    setIsEditAddressMode(true);
    setCurrentEditAddressIndex(addressIndex);
  };

  const handleDeleteAddressClick = async (addressId?: string) => {
    if (!addressId) {
      return;
    }
    const clientId = getClientIdFromLocalStorage();
    if (clientId === null) {
      throw new Error("Client ID is null");
    }

    const actions: CustomerUpdate = {
      version: user?.version ?? 0,
      actions: [
        {
          action: "removeAddress",
          addressId,
        },
      ],
    };
    try {
      setIsLoading(true);
      const response = await ClientCredentialsFlowApiClient()
        .customers()
        .withId({ ID: clientId })
        .post({
          body: actions,
        })
        .execute();

      toast({
        position: "top",
        title: "Address was removed",
        description: "Your address has been removed successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setUser(response.body);
    } catch (error) {
      toast({
        position: "top",
        title: "Error",
        description: "There was an error removing your address.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChangeShippingAddress = async (addressId: string) => {
    try {
      const clientId = getClientIdFromLocalStorage();
      if (clientId === null) {
        throw new Error("Client ID is null");
      }

      const shippingAddressDetails: CustomerUpdate = {
        version: user?.version ?? 0,
        actions: [
          {
            action: "setDefaultShippingAddress",
            addressId,
          },
        ],
      };
      setIsLoading(true);
      const response = await ClientCredentialsFlowApiClient()
        .customers()
        .withId({ ID: clientId })
        .post({ body: shippingAddressDetails })
        .execute();

      toast({
        position: "top",
        title: "Default shipping address changed",
        description:
          "Your default shipping address had been changed successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setUser(response.body);
      setIsEditMode(false);
    } catch {
      toast({
        position: "top",
        title: "Error",
        description:
          "There was an error setting your default shipping address.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChangeBillingAddress = async (addressId: string) => {
    try {
      const clientId = getClientIdFromLocalStorage();
      if (clientId === null) {
        throw new Error("Client ID is null");
      }

      const billingAddressDetails: CustomerUpdate = {
        version: user?.version ?? 0,
        actions: [
          {
            action: "setDefaultBillingAddress",
            addressId,
          },
        ],
      };
      setIsLoading(true);
      const response = await ClientCredentialsFlowApiClient()
        .customers()
        .withId({ ID: clientId })
        .post({ body: billingAddressDetails })
        .execute();

      toast({
        position: "top",
        title: "Default shipping address changed",
        description:
          "Your default shipping address had been changed successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setUser(response.body);
      setIsEditMode(false);
    } catch {
      toast({
        position: "top",
        title: "Error",
        description:
          "There was an error setting your default shipping address.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
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
      setIsLoading(true);
      const updatePasswordDetails: CustomerChangePassword = {
        id: clientId,
        version: user?.version ?? 0,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      };

      const response = await ClientCredentialsFlowApiClient()
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

      setUser(response.body);
      setIsPasswordChangeMode(false);
    } catch (error) {
      toast({
        position: "top",
        title: "Error",
        description: "There was an error updating your password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: Customer) => {
    try {
      const clientId = getClientIdFromLocalStorage();
      if (clientId === null) {
        throw new Error("Client ID is null");
      }
      setIsLoading(true);
      const updateCustomerDetails: CustomerUpdate = {
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

      const response = await ClientCredentialsFlowApiClient()
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
      setUser(response.body);
      setIsEditMode(false);
    } catch (error) {
      toast({
        position: "top",
        title: "Error",
        description: "There was an error updating your profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitAddAddress = async (data: _BaseAddress) => {
    try {
      const clientId = getClientIdFromLocalStorage();
      if (clientId === null) {
        throw new Error("Client ID is null");
      }
      setIsLoading(true);
      const addAddressDetails: CustomerUpdate = {
        version: user?.version ?? 0,
        actions: [
          {
            action: "addAddress",
            address: {
              streetName: data.streetName,
              city: data.city,
              postalCode: data.postalCode,
              country: data.country,
            },
          },
        ],
      };

      const response = await ClientCredentialsFlowApiClient()
        .customers()
        .withId({ ID: clientId })
        .post({ body: addAddressDetails })
        .execute();

      toast({
        position: "top",
        title: "New address added",
        description: "Your address has been added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setUser(response.body);
      setIsAddAddressMode(false);
    } catch (error) {
      toast({
        position: "top",
        title: "Error",
        description: "There was an error adding new address.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitEditAddress = async (data: _BaseAddress) => {
    try {
      const clientId = getClientIdFromLocalStorage();
      if (clientId === null) {
        throw new Error("Client ID is null");
      }

      const addressId = user?.addresses[currentEditAddressIndex].id;

      const addAddressDetails: CustomerUpdate = {
        version: user?.version ?? 0,
        actions: [
          {
            action: "changeAddress",
            addressId,
            address: {
              streetName: data.streetName,
              city: data.city,
              postalCode: data.postalCode,
              country: data.country,
            },
          },
        ],
      };
      setIsLoading(true);
      const response = await ClientCredentialsFlowApiClient()
        .customers()
        .withId({ ID: clientId })
        .post({ body: addAddressDetails })
        .execute();

      toast({
        position: "top",
        title: "Address changed",
        description: "Your address has been changed successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setUser(response.body);
      setIsEditAddressMode(false);
    } catch (error) {
      toast({
        position: "top",
        title: "Error",
        description: "There was an error changing your address.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      {user && (
        <Box p={5}>
          <VStack spacing={5} align="start">
            <Heading as="h1" size="lg">
              User Profile
            </Heading>

            <Box>
              <Heading as="h2" size="md" mb={2}>
                Personal Information
              </Heading>
              <VStack spacing={2} mb={2} align="stretch">
                <Button onClick={handleEditClick}>Edit Profile</Button>
                <Button onClick={handlePasswordChangeClick}>
                  Change Password
                </Button>
              </VStack>
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

              <Button mb={3} onClick={handleAddAddressClick}>
                Add Address
              </Button>

              {user?.addresses?.length > 0 ? (
                <VStack
                  spacing={3}
                  align="stretch"
                  divider={<StackDivider borderColor="gray.200" />}
                >
                  <FormControl as="fieldset">
                    <FormLabel as="legend">Default Billing Address</FormLabel>
                    <RadioGroup
                      onChange={handleOnChangeBillingAddress}
                      value={user.defaultBillingAddressId}
                    >
                      {user.addresses.map((address) => (
                        <HStack key={address.id}>
                          <Radio value={address.id} />
                          <Text>
                            {address.streetName}, {address.city},{" "}
                            {address.country}
                          </Text>
                        </HStack>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormControl as="fieldset">
                    <FormLabel as="legend">Default Shipping Address</FormLabel>
                    <RadioGroup
                      onChange={handleOnChangeShippingAddress}
                      value={user.defaultShippingAddressId}
                    >
                      {user.addresses.map((address) => (
                        <HStack key={address.id}>
                          <Radio value={address.id} />
                          <Text>
                            {address.streetName}, {address.city},{" "}
                            {address.country}
                          </Text>
                        </HStack>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  {user.addresses.map((address) => (
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
                          <IconButton
                            aria-label="Edit address"
                            icon={<EditIcon />}
                            colorScheme="gray"
                            onClick={() => handleEditAddressClick(address.id)}
                          />
                          <IconButton
                            aria-label="Delete address"
                            icon={<DeleteIcon />}
                            colorScheme="gray"
                            onClick={() => handleDeleteAddressClick(address.id)}
                          />
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
                <FormControl
                  isInvalid={!!passwordErrors.currentPassword?.message}
                  isRequired
                >
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

                <FormControl
                  isInvalid={!!passwordErrors.newPassword?.message}
                  isRequired
                >
                  <FormLabel>New Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      placeholder="New Password"
                      {...registerPassword("newPassword", passwordValidation)}
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
                    {passwordErrors.newPassword?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!passwordErrors.confirmNewPassword?.message}
                  isRequired
                >
                  <FormLabel>Confirm New Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      placeholder="Confirm New Password"
                      {...registerPassword(
                        "confirmNewPassword",
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

      <Modal
        isOpen={isAddAddressMode}
        onClose={() => setIsAddAddressMode(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Address</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmitAddAddress(onSubmitAddAddress)}>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl
                  isRequired
                  isInvalid={!!addAddressErrors.streetName?.message}
                >
                  <FormLabel mt={5}>Street</FormLabel>
                  <Input
                    {...registerAddAddress("streetName", streetValidation)}
                    type="street"
                    placeholder="Street"
                  />
                  <FormErrorMessage>
                    {addAddressErrors.streetName?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={!!addAddressErrors.city?.message}
                >
                  <FormLabel mt={5}>City</FormLabel>
                  <Input
                    {...registerAddAddress("city", cityValidation)}
                    type="city"
                    placeholder="City"
                  />
                  <FormErrorMessage>
                    {addAddressErrors.city?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={!!addAddressErrors.postalCode?.message}
                >
                  <FormLabel mt={5}>Postal code</FormLabel>
                  <Input
                    {...registerAddAddress("postalCode", zipValidation)}
                    type="zip"
                    placeholder="Postal code"
                  />
                  <FormErrorMessage>
                    {addAddressErrors.postalCode?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={!!addAddressErrors.country?.message}
                >
                  <FormLabel mt={5}>Country</FormLabel>
                  <Select
                    {...registerAddAddress("country", countryValidation)}
                    placeholder="Select country"
                  >
                    <option value="GB">United Kingdom</option>
                  </Select>
                  <FormErrorMessage>
                    {addAddressErrors.country?.message}
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
                onClick={() => setIsAddAddressMode(false)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* EDIT ADDRESS */}
      <Modal
        isOpen={isEditAddressMode}
        onClose={() => setIsEditAddressMode(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Address</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmitEditAddress(onSubmitEditAddress)}>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl
                  isRequired
                  isInvalid={!!editAddressErrors.streetName?.message}
                >
                  <FormLabel mt={5}>Street</FormLabel>
                  <Input
                    {...registerEditAddress(`streetName`, streetValidation)}
                    type="text"
                    placeholder="Street"
                    defaultValue={
                      user?.addresses[currentEditAddressIndex].streetName
                    }
                  />
                  <FormErrorMessage>
                    {editAddressErrors.streetName?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={!!editAddressErrors.city?.message}
                >
                  <FormLabel mt={5}>City</FormLabel>
                  <Input
                    {...registerEditAddress("city", cityValidation)}
                    type="city"
                    placeholder="City"
                    defaultValue={user?.addresses[currentEditAddressIndex].city}
                  />
                  <FormErrorMessage>
                    {editAddressErrors.city?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={!!editAddressErrors.postalCode?.message}
                >
                  <FormLabel mt={5}>Postal code</FormLabel>
                  <Input
                    {...registerEditAddress("postalCode", zipValidation)}
                    type="zip"
                    placeholder="Postal code"
                    defaultValue={
                      user?.addresses[currentEditAddressIndex].postalCode
                    }
                  />
                  <FormErrorMessage>
                    {editAddressErrors.postalCode?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isRequired
                  isInvalid={!!editAddressErrors.country?.message}
                >
                  <FormLabel mt={5}>Country</FormLabel>
                  <Select
                    {...registerEditAddress("country", countryValidation)}
                    placeholder="Select country"
                    defaultValue={
                      user?.addresses[currentEditAddressIndex].country
                    }
                  >
                    <option value="GB">United Kingdom</option>
                  </Select>
                  <FormErrorMessage>
                    {editAddressErrors.country?.message}
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
                onClick={() => setIsEditAddressMode(false)}
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
