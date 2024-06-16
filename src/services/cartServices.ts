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

const loadOrCreateCart = async () => {
    const cartId = getCartIdFromLocalStorage();
  
    if (cartId) {
      try {
        const { cartData } = await getCartDetails(cartId);
        if (cartData) {
          return cartData;
        }
      } catch (error) {
        console.error('Failed to load existing cart:', error);
      }
    }
  

    const newCart = await createCart();
    return newCart;
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

export { createCart, addProductToCart, loadOrCreateCart };
