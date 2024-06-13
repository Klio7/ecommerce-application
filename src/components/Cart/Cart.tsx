import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Flex, Text, useToast } from "@chakra-ui/react";
import getCartDetails from "../../services/getCartDetails";
import { ICartProduct } from "../../types/types";
import CartProduct from "../CartProduct/CartProduct";
import CartHeader from "../CartHeader/CartHeader";
import changeProductQuantity from "../../services/changeProductQuantity";
import debounce from "../../utils/debounce";
import EmptyCart from "../EmptyCart/EmptyCart";
import { getCartIdFromLocalStorage } from "../../store/LocalStorage";

interface ICartData {
  cartProducts: ICartProduct[] | undefined;
  total: string;
}
function Cart() {
  const [cartData, setCartData] = useState<ICartData>();
  const toast = useToast();
  const cartId = getCartIdFromLocalStorage();

  useEffect(() => {
    async function getCart(cardId: string) {
      try {
        const { cartData: data } = await getCartDetails(cardId);
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
    if (!cartId) {
      return;
    }
    getCart(cartId);
  }, [toast, cartId]);

  const onChangeQuantity = useCallback(
    async (productId: string, value: string) => {
      if (!cartId) {
        return;
      }

      try {
        const data = await changeProductQuantity(
          cartId,
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
    [toast, cartId],
  );

  const handleQuantityChange = useMemo(
    () => debounce(onChangeQuantity, 300),
    [onChangeQuantity],
  );

  if (!cartData?.cartProducts?.length || !cartId) {
    return <EmptyCart />;
  }

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
