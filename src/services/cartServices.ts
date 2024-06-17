import {
  AnonymousFlowApiClient,
  ClientCredentialsFlowApiClient,
} from "./apiClients";
import getCartDetails from "./getCartDetails";
import {
  getCartIdFromLocalStorage,
  getTokenFromLocalStorage,
  setCartIdFromLocalStorage,
} from "../store/LocalStorage";
import debounce from "../utils/debounce";

const getApiClient = () => {
  const { isAuthenticated } = getTokenFromLocalStorage();
  return isAuthenticated
    ? ClientCredentialsFlowApiClient()
    : AnonymousFlowApiClient();
};

const createCart = async () => {
  const apiClient = getApiClient();
  try {
    const response = await apiClient
      .carts()
      .post({
        body: {
          currency: "USD",
        },
      })
      .execute();

    const cartData = response.body;
    setCartIdFromLocalStorage(cartData.id);
    return cartData;
  } catch (error) {
    return Promise.reject(error);
  }
};

const addProductToCart = async (productId: string) => {
  let cartId = getCartIdFromLocalStorage();

  try {
    if (!cartId) {
      const cart = await createCart();
      cartId = cart.id;
    }

    const apiClient = getApiClient();

    const { version } = await getCartDetails(cartId);
    const updatedCart = await apiClient
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version,
          actions: [
            {
              action: "addLineItem",
              productId,
            },
          ],
        },
      })
      .execute();

    return updatedCart.body;
  } catch (error) {
    return Promise.reject(error);
  }
};

const debouncedAddProductToCart = debounce(addProductToCart, 400);

export { createCart, debouncedAddProductToCart as addProductToCart };
