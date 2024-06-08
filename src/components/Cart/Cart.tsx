import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Flex, Text, useToast } from "@chakra-ui/react";
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
  const toast = useToast();
  useEffect(() => {
    async function getCart(cardId: string) {
      try {
        const data = await getCartDetails(cardId);
        const { cartProducts, total } = data;
        setCartData({ cartProducts, total });
      } catch (error) {
        if (error instanceof Error) {
          toast({
            position: "top",
            title: "Sorry!",
            description: `${error.message}`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    }
    getCart("9ba8f627-278e-4fe4-b6e6-5b49c986b66b");
  }, [toast]);

  const onChangeQuantity = useCallback(
    async (productId: string, value: string) => {
      try {
        const data = await changeProductQuantity(
          "9ba8f627-278e-4fe4-b6e6-5b49c986b66b",
          productId,
          Number(value),
        );
        setCartData(data);
      } catch (error) {
        if (error instanceof Error) {
          toast({
            position: "top",
            title: "Sorry!",
            description: `${error.message}`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    },
    [toast],
  );

  const handleQuantityChange = useMemo(
    () => debounce(onChangeQuantity, 400),
    [onChangeQuantity],
  );

  return (
    <Flex direction="column" alignItems="flex-end">
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
        justifyContent="space-between"
        p="20px"
        bg="footerColorDark"
        color="white"
        w="30%"
        m="10px 10px 30px 10px"
      >
        <Text>Cart total:</Text>
        <Text> {cartData?.total}</Text>
      </Flex>
    </Flex>
  );
}

export default Cart;
