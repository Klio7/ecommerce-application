import React from "react";
import { it, expect, describe } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignUpForm from "../../components/SignUp/SignUpForm";
import "@testing-library/jest-dom/vitest";

describe("SignUpForm", () => {
  render(<SignUpForm />);
  const emailInput = screen.getByPlaceholderText("Please enter email");
  const passwordInput = screen.getByPlaceholderText("Create a password");
  const firstNameInput = screen.getByPlaceholderText("First name");
  const lastNameInput = screen.getByPlaceholderText("Last name");
  const streetInput = screen.getByPlaceholderText("Street");
  const cityInput = screen.getByPlaceholderText("City");
  const postalCodeInput = screen.getByPlaceholderText("Postal code");

  it("should say if email is invalid", async () => {
    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    await waitFor(async () => {
      expect(
        await screen.getByText(
          "Please enter a valid email (e.g. user@gmail.com)",
        ),
      ).toBeInTheDocument();
    });
  });

  it("should say if no email is entered", async () => {
    fireEvent.change(emailInput, { target: { value: "" } });
    await waitFor(async () => {
      expect(
        await screen.getByText("Please enter your email"),
      ).toBeInTheDocument();
    });
  });

  it("should say if password contains spaces", async () => {
    fireEvent.change(passwordInput, { target: { value: "invalid password" } });
    await waitFor(async () => {
      expect(
        await screen.getByText("Please, don't use spaces"),
      ).toBeInTheDocument();
    });
  });

  it("should say if password doesn't contain at least one capital letter and one lowercase letter", async () => {
    fireEvent.change(passwordInput, { target: { value: "111" } });
    await waitFor(async () => {
      expect(
        await screen.getByText(
          "Please add at least one capital letter and one lowercase letter",
        ),
      ).toBeInTheDocument();
    });
  });

  it("should say if password doesn't contain at least one digit", async () => {
    fireEvent.change(passwordInput, { target: { value: "Aa" } });
    await waitFor(async () => {
      expect(
        await screen.getByText("Please add at least one digit"),
      ).toBeInTheDocument();
    });
  });

  it("should say if password doesn't contain at least one special character", async () => {
    fireEvent.change(passwordInput, { target: { value: "Aa1" } });
    await waitFor(async () => {
      expect(
        await screen.getByText(
          "Please add at least one special character(!@#$%^&*)",
        ),
      ).toBeInTheDocument();
    });
  });

  it("should say if password doesn't contain 8 characters or more", async () => {
    fireEvent.change(passwordInput, { target: { value: "Aa1@111" } });
    await waitFor(async () => {
      expect(
        await screen.getByText("Please, enter 8 characters or more"),
      ).toBeInTheDocument();
    });
  });

  it("should say if no password is entered", async () => {
    fireEvent.change(passwordInput, { target: { value: "" } });
    await waitFor(async () => {
      expect(
        await screen.getByText("Please enter your password"),
      ).toBeInTheDocument();
    });
  });

  it("should say if firstname contains not only Latin letters", async () => {
    fireEvent.change(firstNameInput, { target: { value: "1" } });
    await waitFor(async () => {
      expect(
        await screen.getByText("First name should contain only Latin letters"),
      ).toBeInTheDocument();
    });
  });

  it("should say if no firstname is entered", async () => {
    fireEvent.change(firstNameInput, { target: { value: "" } });
    await waitFor(async () => {
      expect(
        await screen.getByText("Please enter your first name"),
      ).toBeInTheDocument();
    });
  });

  it("should say if lastname contains not only Latin letters", async () => {
    fireEvent.change(lastNameInput, { target: { value: "^" } });
    await waitFor(async () => {
      expect(
        await screen.getByText("Last name should contain only Latin letters"),
      ).toBeInTheDocument();
    });
  });

  it("should say if no lastname is entered", async () => {
    fireEvent.change(lastNameInput, { target: { value: "" } });
    await waitFor(async () => {
      expect(
        await screen.getByText("Please enter your last name"),
      ).toBeInTheDocument();
    });
  });

  it("should say if street contains not only Latin letters or numbers", async () => {
    fireEvent.change(streetInput, { target: { value: "^" } });
    await waitFor(async () => {
      expect(
        await screen.getByText(
          "Street should contain only Latin letters and numbers",
        ),
      ).toBeInTheDocument();
    });
  });

  it("should say if no street is entered", async () => {
    fireEvent.change(streetInput, { target: { value: "" } });
    await waitFor(async () => {
      expect(await screen.getByText("Please enter street")).toBeInTheDocument();
    });
  });

  it("should say if city contains not only Latin letters", async () => {
    fireEvent.change(cityInput, { target: { value: "0" } });
    await waitFor(async () => {
      expect(
        await screen.getByText("City should contain only Latin letters"),
      ).toBeInTheDocument();
    });
  });

  it("should say if no city is entered", async () => {
    fireEvent.change(cityInput, { target: { value: "" } });
    await waitFor(async () => {
      expect(await screen.getByText("Please enter city")).toBeInTheDocument();
    });
  });

  it("should say if postalcode doesn't suit UK postal codes", async () => {
    fireEvent.change(postalCodeInput, { target: { value: "PPP" } });
    await waitFor(async () => {
      expect(
        await screen.getByText("Invalid UK postal code"),
      ).toBeInTheDocument();
    });
  });

  it("should say if no postal code is entered", async () => {
    fireEvent.change(postalCodeInput, { target: { value: "" } });
    await waitFor(async () => {
      expect(
        await screen.getByText("Please enter postal code"),
      ).toBeInTheDocument();
    });
  });
});
