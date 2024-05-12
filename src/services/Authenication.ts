import apiRoot from "./CreateClient";

const loginCustomer = (email: string, password: string) =>
  apiRoot
    .me()
    .login()
    .post({
      body: {
        email,
        password,
      },
    })
    .execute();

export default loginCustomer;
