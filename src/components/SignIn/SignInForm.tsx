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
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useAuth from "../../hooks/useAuth";
import loginCustomer from "../../services/Authenication";
import { SignInFormInputs } from "../../types/types";
import { passwordValidation, emailValidation } from "../../utils/validation";

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>({
    mode: "onChange",
  });
  const toast = useToast();
  const { setAuth } = useAuth();

  const onSubmit: SubmitHandler<SignInFormInputs> = (data) =>
    loginCustomer(data.email, data.password)
      .then(() => {
        setAuth(true);
        toast({
          position: "top",
          title: "Welcome!",
          description: "You are succesfully signed in.",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        if (error) {
          if (error.statusCode === 400) {
            toast({
              position: "top",
              title: "Sorry.",
              description:
                "Your email or password is invalid. Try again or sign up.",
              status: "error",
              duration: 6000,
              isClosable: true,
            });
          }
        }
      });
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormControl isRequired isInvalid={!!errors.email?.message}>
        <FormLabel mt={5}> Email address</FormLabel>
        <Input
          {...register("email", emailValidation)}
          type="email"
          placeholder="email"
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.password?.message}>
        <FormLabel mt={5}>Password</FormLabel>
        <InputGroup>
          <Input
            {...register("password", passwordValidation)}
            type={show ? "text" : "password"}
            placeholder="password"
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
      <Button
        mt={5}
        bg="white"
        border="2px"
        border-color="black"
        width="100%"
        type="submit"
      >
        SIGN IN
      </Button>
    </form>
  );
}

export default SignInForm;
