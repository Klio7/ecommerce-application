import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import getCartDetails from "../../services/getCartDetails";
import { ICartProduct } from "../../types/types";
import CartProduct from "../CartProduct/CartProduct";
import CartHeader from "../CartHeader/CartHeader";

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
      console.log(total);
    }
    getCart("9ba8f627-278e-4fe4-b6e6-5b49c986b66b");
  }, []);

  return (
    <Flex direction="column" px="10px" bg="lightBaseColor">
      <Flex direction="column">
        <CartHeader />
        {cartData?.cartProducts?.map((product) => (
          <CartProduct
            imageUrl={product.imageUrl}
            title={product.title}
            price={product.price}
            number={product.number}
            totalProductPrice={product.totalProductPrice}
            key={product.imageUrl}
          />
        ))}
      </Flex>
      <Flex justify="flex-end" p="20px">
        Total: {cartData?.total}
      </Flex>
    </Flex>
  );
}

export default Cart;
