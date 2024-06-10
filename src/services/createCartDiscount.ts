import { ClientCredentialsFlowApiClient } from "./apiClients";

export function createCartDiscount() {
  ClientCredentialsFlowApiClient()
    .cartDiscounts()
    .post({
      body: {
        name: { en: "10% off total price" },
        key: "10-percent-off",
        description: { en: "Apply 10% off on total cart price" },
        value: { type: "relative", permyriad: 1000 },
        cartPredicate: "1 = 1",
        target: { type: "lineItems", predicate: "1 = 1" },
        sortOrder: "0.1",
        isActive: false,
      },
    })
    .execute()
    .then((response) =>
      console.log("Cart discount created successfully:", response.body),
    )
    .catch((error) => {
      console.error("Error creating cart discount:", error);
    });
}

const createDiscountWithCode = async () => {
  try {
    const cartDiscountResponse = await ClientCredentialsFlowApiClient()
      .cartDiscounts()
      .post({
        body: {
          name: { en: "10% off total price" },
          key: "promo",
          description: { en: "Apply 10% off on total cart price" },
          value: { type: "relative", permyriad: 1000 },
          cartPredicate: "1 = 1",
          target: { type: "lineItems", predicate: "1 = 1" },
          sortOrder: "0.3",
          isActive: true,
          requiresDiscountCode: true,
        },
      })
      .execute();

    const cartDiscountId = cartDiscountResponse.body.id;

    const discountCodeResponse = await ClientCredentialsFlowApiClient()
      .discountCodes()
      .post({
        body: {
          code: "SURVIVOR",
          cartDiscounts: [{ typeId: "cart-discount", id: cartDiscountId }],
          isActive: true,
        },
      })
      .execute();

    console.log(
      "Discount code created successfully:",
      discountCodeResponse.body,
    );
    return discountCodeResponse.body;
  } catch (error) {
    console.error("Error creating discount with code:", error);
    throw error;
  }
};
export default createDiscountWithCode;
