import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { birthDateValidation, emailValidation, firstNameValidation, lastNameValidation, passwordValidation } from "../../utils/validation";

interface SignUpFormInputs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
}

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<SignUpFormInputs> = (data) => console.log(data);
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
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
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
            placeholder='Select Date' 
            type='date'
        />
        <FormErrorMessage>{errors.birthDate?.message}</FormErrorMessage>
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
