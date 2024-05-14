import { RegisterOptions } from "react-hook-form";

export const emailValidation: RegisterOptions = {
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Please enter a valid email (e.g. user@gmail.com)",
  },
  required: "Please enter your email",
};

export const passwordValidation: RegisterOptions = {
  validate: {
    checkSpace: (value) => !/\s/.test(value) || "Please, don't use spaces",
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
};

export const firstNameValidation: RegisterOptions = {
  validate: {
    checkDigit: (value) =>
      !/(?=.*[0-9])/.test(value) || "Name shouldn't contain digits",
    checkSymbol: (value) =>
      !/(?=.*[!@#$%^&*])/.test(value) ||
      "Please don't use special characters (!@#$%^&*)",
    checkLength: (value) => value.length >= 1 || "Too short",
  },
  required: "Please enter your first name",
};

export const lastNameValidation: RegisterOptions = {
  validate: {
    checkDigit: (value) =>
      !/(?=.*[0-9])/.test(value) || "Name shouldn't contain digits",
    checkSymbol: (value) =>
      !/(?=.*[!@#$%^&*])/.test(value) ||
      "Please don't use special characters (!@#$%^&*)",
    checkLength: (value) => value.length >= 1 || "Too short",
  },
  required: "Please enter your last name",
};

export const birthDateValidation: RegisterOptions = {
  validate: {
    checkDate: (value) => {
      const thirteenYearsAgo = Date.now() - 13 * 365.25 * 24 * 60 * 60 * 1000;
      if (new Date(value).getTime() <= thirteenYearsAgo) {
        return true;
      }
      return "You should be at least 13 years old";
    },
  },
  required: "Please enter your date of birth",
};

export const streetValidation: RegisterOptions = {
  validate: {
    checkLength: (value) => value.length >= 1 || "Too short",
  },
  required: "Please enter street",
};

export const cityValidation: RegisterOptions = {
  validate: {
    checkDigit: (value) =>
      !/(?=.*[0-9])/.test(value) || "City shouldn't contain digits",
    checkSymbol: (value) =>
      !/(?=.*[!@#$%^&*])/.test(value) ||
      "City shouldn't contain special characters (!@#$%^&*)",
    checkLength: (value) => value.length >= 1 || "Too short",
  },
  required: "Please enter city",
};

export const countryValidation: RegisterOptions = {
  required: "Please select country",
};

export const zipValidation: RegisterOptions = {
  validate: {
    // regex for UK postal code https://stackoverflow.com/a/51885364
    checkUKPostCode: (value) =>
      /^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0A{2})$/.test(value) ||
      "Invalid UK postal code",
  },
  required: "Please enter postal code",
};
