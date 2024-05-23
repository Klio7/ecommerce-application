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
  Box,
  Checkbox,
} from "@chakra-ui/react";
// import { CustomerDraft } from "@commercetools/platform-sdk";
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
import { ClientCredentialsFlowApiClient } from "../../services/apiClients";
import useAuth from "../../hooks/useAuth";
import signInCustomer from "../../services/authenication";

interface SignUpFormInputs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  billingStreet: string;
  billingCity: string;
  billingZip: string;
  billingCountry: string;
  shippingStreet: string;
  shippingCity: string;
  shippingZip: string;
  shippingCountry: string;
  useSameAddress: boolean;
  setDefaultBilling: boolean;
  setDefaultShipping: boolean;
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
    watch,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    mode: "onChange",
  });

  const { setAuth } = useAuth();
  const toast = useToast();
  const useSameAddress = watch("useSameAddress");
  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      const shippingAdrress = {
        streetName: data.shippingStreet,
        city: data.shippingCity,
        postalCode: data.shippingZip,
        country: data.shippingCountry,
      };
      const deliveryAddress = data.useSameAddress
        ? shippingAdrress
        : {
            streetName: data.billingStreet,
            city: data.billingCity,
            postalCode: data.billingZip,
            country: data.billingCountry,
          };

      const addresses = [shippingAdrress];

      if (!data.useSameAddress) {
        addresses.push(deliveryAddress);
      }

      let defaultBillingAddress;
      if (data.setDefaultShipping) {
        defaultBillingAddress = data.useSameAddress ? 0 : 1;
      } else {
        defaultBillingAddress = undefined;
      }

      const newCustomerDetails = {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        addresses,
        shippingAddresses: [0],
        billingAddresses: [useSameAddress ? 0 : 1],
        defaultShippingAddress: data.setDefaultShipping ? 0 : undefined,
        defaultBillingAddress,
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

      {/* Shipping Address Section */}
      <Box mt={10} mb={5}>
        <FormLabel fontSize="lg">Shipping Address</FormLabel>
      </Box>
      <FormControl isRequired isInvalid={!!errors.shippingStreet?.message}>
        <FormLabel mt={5}>Street</FormLabel>
        <Input
          {...register("shippingStreet", streetValidation)}
          type="street"
          placeholder="Street"
        />
        <FormErrorMessage>{errors.shippingStreet?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.shippingCity?.message}>
        <FormLabel mt={5}>City</FormLabel>
        <Input
          {...register("shippingCity", cityValidation)}
          type="city"
          placeholder="City"
        />
        <FormErrorMessage>{errors.shippingCity?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.shippingZip?.message}>
        <FormLabel mt={5}>Postal code</FormLabel>
        <Input
          {...register("shippingZip", zipValidation)}
          type="zip"
          placeholder="Postal code"
        />
        <FormErrorMessage>{errors.shippingZip?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.shippingCountry?.message}>
        <FormLabel mt={5}>Country</FormLabel>
        <Select
          {...register("shippingCountry", countryValidation)}
          placeholder="Select country"
        >
          <option value="GB">United Kingdom</option>
        </Select>
        <FormErrorMessage>{errors.shippingCountry?.message}</FormErrorMessage>
      </FormControl>
      {/* Checkbox for default address */}
      <FormControl mt={5}>
        <Checkbox {...register("setDefaultShipping")}>
          Use as default shipping address
        </Checkbox>
      </FormControl>
      {/* Checkbox for same address */}
      <FormControl mt={5}>
        <Checkbox {...register("useSameAddress")}>
          Use the same address for billing
        </Checkbox>
      </FormControl>
      {/* Billing Address Section */}
      {!useSameAddress && (
        <>
          <Box mt={10} mb={5}>
            <FormLabel fontSize="lg">Billing Address</FormLabel>
          </Box>
          <FormControl isRequired isInvalid={!!errors.billingStreet?.message}>
            <FormLabel mt={5}>Street</FormLabel>
            <Input
              {...register("billingStreet", streetValidation)}
              type="street"
              placeholder="Street"
            />
            <FormErrorMessage>{errors.billingStreet?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.billingCity?.message}>
            <FormLabel mt={5}>City</FormLabel>
            <Input
              {...register("billingCity", cityValidation)}
              type="city"
              placeholder="City"
            />
            <FormErrorMessage>{errors.billingCity?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.billingZip?.message}>
            <FormLabel mt={5}>Postal code</FormLabel>
            <Input
              {...register("billingZip", zipValidation)}
              type="zip"
              placeholder="Postal code"
            />
            <FormErrorMessage>{errors.billingZip?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.billingCountry?.message}>
            <FormLabel mt={5}>Country</FormLabel>
            <Select
              {...register("billingCountry", countryValidation)}
              placeholder="Select country"
            >
              <option value="GB">United Kingdom</option>
            </Select>
            <FormErrorMessage>
              {errors.billingCountry?.message}
            </FormErrorMessage>
          </FormControl>
          {/* Checkbox for default address */}
          <FormControl mt={5}>
            <Checkbox {...register("setDefaultBilling")}>
              Use as default billing address
            </Checkbox>
          </FormControl>
        </>
      )}

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
