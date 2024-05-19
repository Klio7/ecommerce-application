import React from 'react';
import { it, expect, describe } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SignInForm from '../../components/SignIn/SignInForm';
import '@testing-library/jest-dom/vitest';

describe('SignInForm', () => {
    render(<SignInForm />);
    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');

    it('should say if email is invalid', async () => {

      fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
       await waitFor(async () => {
          expect(await screen.getByText("Please enter a valid email (e.g. user@gmail.com)")).toBeInTheDocument();
        });
})

it('should say if no email is entered', async () => {

  fireEvent.change(emailInput, { target: { value: '' } });
   await waitFor(async () => {
      expect(await screen.getByText("Please enter your email")).toBeInTheDocument();
    });
})

    it('should say if password contains spaces', async () => {

        

        fireEvent.change(passwordInput, { target: { value: 'invalid password' } });
         await waitFor(async () => {
            expect(await screen.getByText("Please, don't use spaces")).toBeInTheDocument();
          });
})

it("should say if password doesn't contain at least one capital letter and one lowercase letter", async () => {
    

    fireEvent.change(passwordInput, { target: { value: '111' } });
     await waitFor(async () => {
        expect(await screen.getByText("Please add at least one capital letter and one lowercase letter")).toBeInTheDocument();
      });
})

it("should say if password doesn't contain at least one digit", async () => {
    

    fireEvent.change(passwordInput, { target: { value: 'Aa' } });
     await waitFor(async () => {
        expect(await screen.getByText("Please add at least one digit")).toBeInTheDocument();
      });
})

it("should say if password doesn't contain at least one special character", async () => {
    

    fireEvent.change(passwordInput, { target: { value: 'Aa1' } });
     await waitFor(async () => {
        expect(await screen.getByText("Please add at least one special character(!@#$%^&*)")).toBeInTheDocument();
      });
})

it("should say if password doesn't contain 8 characters or more", async () => {

    fireEvent.change(passwordInput, { target: { value: 'Aa1@111' } });
     await waitFor(async () => {
        expect(await screen.getByText("Please, enter 8 characters or more")).toBeInTheDocument();
      });
})

it('should say if no password is entered', async () => {

  fireEvent.change(passwordInput, { target: { value: '' } });
   await waitFor(async () => {
      expect(await screen.getByText("Please enter your password")).toBeInTheDocument();
    });
})
})