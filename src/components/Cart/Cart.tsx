import React, { useState, useEffect, useMemo } from "react";
import { Flex } from "@chakra-ui/react";
import getCartDetails from "../../services/getCartDetails";
import { ICartProduct } from "../../types/types";
import CartProduct from "../CartProduct/CartProduct";
import CartHeader from "../CartHeader/CartHeader";
import changeProductQuantity from "../../services/changeProductQuantity";
import debounce from "../../utils/debounce";

interface ICartData {
  cartProducts: ICartProduct[] | undefined;
  total: string;
}
function Cart() {
  const [cartData, setCartData] = useState<ICartData>();
  useEffect(() => {
    async function getCart(cardId: string) {
      const data = await getCartDetails(cardId);
      const { cartProducts, total } = data;
      setCartData({ cartProducts, total });
    }
    getCart("9ba8f627-278e-4fe4-b6e6-5b49c986b66b");
  }, []);

  async function onChangeQuantity(productId: string, value: string) {
    const data = await changeProductQuantity(
      "9ba8f627-278e-4fe4-b6e6-5b49c986b66b",
      productId,
      Number(value),
    );
    setCartData(data);
  }

  const handleQuantityChange = useMemo(
    () => debounce(onChangeQuantity, 400),
    [],
  );

  return (
    <Flex direction="column" alignItems="center">
      <Flex direction="column" px="10px">
        <CartHeader />
        {cartData?.cartProducts?.map((product) => (
          <CartProduct
            productId={product.productId}
            imageUrl={product.imageUrl}
            title={product.title}
            price={product.price}
            number={product.number}
            totalProductPrice={product.totalProductPrice}
            key={product.productId}
            handleQuantityChange={handleQuantityChange}
          />
        ))}
      </Flex>
      <Flex
        justify="flex-end"
        align="flex-end"
        p="20px"
        bg="footerColorDark"
        color="white"
        w="40%"
        m="10px 10px 30px 10px"
      >
        Cart total: {cartData?.total}
      </Flex>
    </Flex>
  );
}

export default Cart;
