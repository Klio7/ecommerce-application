import React from "react";
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Address } from "@commercetools/platform-sdk";
import { birthDateValidation, emailValidation, firstNameValidation, lastNameValidation } from "../../utils/validation";
import { getClientIdFromLocalStorage } from "../../store/LocalStorage";
import { ClientCredentialsFlowApiClient } from "../../services/apiClients";

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

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserData) => void;
}

function EditProfileModal ({ isOpen, onClose, onSubmit }: EditProfileModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm<UserData>();

  const toast = useToast();

  const onFormSubmit = async (data: UserData) => {
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

      onSubmit(data);

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
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Edit User Profile</ModalHeader>
      <ModalCloseButton />
      <form onSubmit={handleSubmit(onFormSubmit)}>
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
            {/* Add inputs for addresses if needed */}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} type="submit">
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </form>
    </ModalContent>
  </Modal>
  );
}

export default EditProfileModal;