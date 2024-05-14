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
import loginCustomer from "../../services/Authenication";

interface SignInFormInputs {
  email: string;
  password: string;
}

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>({
    mode: "onChange",
  });
  const toast = useToast();

  const onSubmit: SubmitHandler<SignInFormInputs> = (data) =>
    loginCustomer(data.email, data.password)
      .then(({ body }) => {
        console.log(body);
      })
      .catch((error) => {
        if (error) {
          if (error.statusCode === 400) {
            toast({
              position: "top",
              title: "Sorry.",
              description: "Your email or password is invalid",
              status: "error",
              duration: 9000,
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
          {...register("email", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email (e.g. user@gmail.com)",
            },
            required: "Please enter your email",
          })}
          type="email"
          placeholder="email"
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.password?.message}>
        <FormLabel mt={5}>Password</FormLabel>
        <InputGroup>
          <Input
            {...register("password", {
              validate: {
                checkSpace: (value) =>
                  !/\s/.test(value) || "Please, don't use spaces",
                checkLetters: (value) =>
                  /(?=.*[a-z])(?=.*[A-Z])/.test(value) ||
                  "Please add at least one capital letter and one lowercase letter",
                checkDigit: (value) =>
                  /(?=.*[0-9])/.test(value) || "Please add at least one digit",
                checkSymbol: (value) =>
                  /(?=.*[!@#$%^&*])/.test(value) ||
                  "Please add at least one special character(!@#$%^&*)",
                checkLength: (value) =>
                  value.length >= 8 || "Please, enter 8 characters or more",
              },
              required: "Please enter your password",
            })}
            type={show ? "text" : "password"}
            placeholder="password"
          />
          <InputRightElement width="4.5rem">
            <IconButton aria-label="Search database" onClick={handleClick}>
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
