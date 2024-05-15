import apiRoot from "./CreateClient";

const loginCustomer = async (email: string, password: string) =>
  apiRoot

    .login()
    .post({
      body: {
        email,
        password,
      },
    })
    .execute();
export default loginCustomer;
