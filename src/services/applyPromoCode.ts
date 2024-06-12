import { ClientCredentialsFlowApiClient } from "./apiClients";
import getCartVersion from "./getCartVersion";

async function applyPromoCode(cartId: string, discountCode: string) {
  const version = await getCartVersion(cartId);
  try {
    const data = ClientCredentialsFlowApiClient()
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version,
          actions: [
            {
              action: "addDiscountCode",
              code: discountCode,
            },
          ],
        },
      })
      .execute();
    return await data;
  } catch (error) {
    return Promise.reject(error);
  }
}
export default applyPromoCode;
