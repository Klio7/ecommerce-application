import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Flex, Text, useToast, Input, Button } from "@chakra-ui/react";
import getCartDetails from "../../services/getCartDetails";
import { ICartProduct } from "../../types/types";
import CartProduct from "../CartProduct/CartProduct";
import CartHeader from "../CartHeader/CartHeader";
import changeProductQuantity from "../../services/changeProductQuantity";
import debounce from "../../utils/debounce";
import EmptyCart from "../EmptyCart/EmptyCart";
import applyPromoCode from "../../services/applyPromoCode";

interface ICartData {
  cartProducts: ICartProduct[] | undefined;
  total: string;
}
function Cart({ cartId }: { cartId: string }) {
  const [cartData, setCartData] = useState<ICartData>();
  const toast = useToast();
  const [inputValue, setInputValue] = useState("");
  const handleChange = (event: React.ChangeEvent) =>
    setInputValue((event.target as HTMLInputElement).value);

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
    getCart(cartId);
  }, [toast, cartId]);

  const onChangeQuantity = useCallback(
    async (productId: string, value: string) => {
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

  if (!cartData?.cartProducts?.length) {
    return <EmptyCart />;
  }
  return (
    <Flex direction="column" alignItems="stretch">
      <Flex direction="column" px="10px">
        <CartHeader />
        {cartData?.cartProducts?.map((product) => (
          <CartProduct
            productId={product.productId}
            imageUrl={product.imageUrl}
            title={product.title}
            discountedCartPrice={product.discountedCartPrice}
            discountedPrice={product.discountedPrice}
            price={product.price}
            number={product.number}
            totalProductPrice={product.totalProductPrice}
            key={product.productId}
            handleQuantityChange={handleQuantityChange}
          />
        ))}
      </Flex>
      <Flex justifyContent="space-between" my="20px">
        <Flex>
          <Input
            placeholder="PROMO CODE"
            w="180px"
            marginLeft="15px"
            borderRadius="0"
            onChange={(event) => handleChange(event)}
          />
          <Button
            color="white"
            bg="footerColorDark"
            p="20px 40px"
            fontWeight="400"
            borderRadius="0"
            mx="20px"
            onClick={() =>
              applyPromoCode(cartId, inputValue)
                .then((data) =>
                  toast({
                    position: "top",
                    title: "Congrats!",
                    description: `${data}`,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  }),
                )
                .catch((error) =>
                  toast({
                    position: "top",
                    title: "Sorry!",
                    description: `${error.message}`,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  }),
                )
            }
          >
            APPLY
          </Button>
        </Flex>
        <Flex
          justifyContent="space-between"
          p="20px"
          bg="footerColorDark"
          color="white"
          w="30%"
        >
          <Text>Cart total:</Text>
          <Text> {cartData?.total}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Cart;
