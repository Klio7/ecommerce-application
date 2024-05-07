import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";

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
  const onSubmit: SubmitHandler<SignInFormInputs> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired isInvalid={!!errors.email?.message}>
        <FormLabel> Email address</FormLabel>
        <Input
          {...register("email", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email",
            },
            required: "Please enter your email",
          })}
          type="email"
          placeholder="email"
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.password?.message}>
        <FormLabel>Password</FormLabel>
        <Input
          {...register("password", {
            minLength: {
              value: 8,
              message: "Please enter at least 8 characters",
            },
            pattern: {
              value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/,
              message:
                "Please enter at least one digit, one lowercase letter, one uppercase letter and one special character(!@#$%^&*)",
            },
            required: "Please enter your password",
          })}
          type="password"
          placeholder="password"
        />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit">SIGN IN</Button>
    </form>
  );
}

export default SignInForm;
