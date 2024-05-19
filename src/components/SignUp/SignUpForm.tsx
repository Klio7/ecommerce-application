import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputRightElement,
  Select,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { CustomerDraft } from "@commercetools/platform-sdk";
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
import { ClientCredentialsFlowApiClient } from "../../services/ApiClients";
import useAuth from "../../hooks/useAuth";
import signInCustomer from "../../services/Authenication";

interface SignUpFormInputs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  street: string;
  city: string;
  zip: string;
  country: string;
}

interface ApiError {
  statusCode: number;
  message: string;
  body?: {
    message?: string;
    statusCode?: number;
  };
}

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    mode: "onChange",
  });

  const { setAuth } = useAuth();
  const toast = useToast();
  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      const newCustomerDetails: CustomerDraft = {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.birthDate,
        addresses: [
          {
            country: data.country,
            streetName: data.street,
            postalCode: data.zip,
            city: data.city,
          },
        ],
      };

      // create customer
      await ClientCredentialsFlowApiClient()
        .customers()
        .post({ body: newCustomerDetails })
        .execute();

      // login for the customer
      await signInCustomer(data.email, data.password);

      setAuth(true);

      toast({
        position: "top",
        title: "Welcome!",
        description: "You are succesfully signed up.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError.body && apiError.body.statusCode === 400) {
        if (
          apiError.body.message?.includes(
            "There is already an existing customer with the provided email",
          )
        ) {
          toast({
            position: "top",
            title: "Error",
            description:
              "An account with this email address already exists. Please log in or use another email.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            position: "top",
            title: "Error",
            description:
              "Invalid input. Please check your details and try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        toast({
          position: "top",
          title: "Error",
          description:
            "Something went wrong during the registration process. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormControl isRequired isInvalid={!!errors.email?.message}>
        <FormLabel mt={5}> Email address</FormLabel>
        <Input
          {...register("email", emailValidation)}
          type="email"
          placeholder="Please enter email"
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.password?.message}>
        <FormLabel mt={5}>Password</FormLabel>
        <InputGroup>
          <Input
            {...register("password", passwordValidation)}
            type={show ? "text" : "password"}
            placeholder="Create a password"
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
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.firstName?.message}>
        <FormLabel mt={5}>First name</FormLabel>
        <Input
          {...register("firstName", firstNameValidation)}
          type="firstName"
          placeholder="First name"
        />
        <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.lastName?.message}>
        <FormLabel mt={5}>Last name</FormLabel>
        <Input
          {...register("lastName", lastNameValidation)}
          type="lastName"
          placeholder="Last name"
        />
        <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.birthDate?.message}>
        <FormLabel mt={5}>Date of birth</FormLabel>
        <Input
          {...register("birthDate", birthDateValidation)}
          placeholder="Select Date"
          type="date"
        />
        <FormErrorMessage>{errors.birthDate?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.street?.message}>
        <FormLabel mt={5}>Street</FormLabel>
        <Input
          {...register("street", streetValidation)}
          type="street"
          placeholder="Street"
        />
        <FormErrorMessage>{errors.street?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.city?.message}>
        <FormLabel mt={5}>City</FormLabel>
        <Input
          {...register("city", cityValidation)}
          type="city"
          placeholder="City"
        />
        <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.zip?.message}>
        <FormLabel mt={5}>Postal code</FormLabel>
        <Input
          {...register("zip", zipValidation)}
          type="zip"
          placeholder="Postal code"
        />
        <FormErrorMessage>{errors.zip?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.country?.message}>
        <FormLabel mt={5}>Country</FormLabel>
        <Select
          {...register("country", countryValidation)}
          placeholder="Select country"
        >
          <option value="GB">United Kingdom</option>
        </Select>
        <FormErrorMessage>{errors.country?.message}</FormErrorMessage>
      </FormControl>
      <Button
        mt={5}
        bg="white"
        border="2px"
        border-color="black"
        width="100%"
        type="submit"
      >
        SIGN UP
      </Button>
    </form>
  );
}

export default SignUpForm;
