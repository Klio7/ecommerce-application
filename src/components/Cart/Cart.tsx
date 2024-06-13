import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Text, useToast, Input, Button, Spinner } from "@chakra-ui/react";
import getCartDetails from "../../services/getCartDetails";
import { ICart } from "../../types/types";
import CartProduct from "../CartProduct/CartProduct";
import CartHeader from "../CartHeader/CartHeader";
import changeProductQuantity from "../../services/changeProductQuantity";
import debounce from "../../utils/debounce";
import EmptyCart from "../EmptyCart/EmptyCart";
import { getCartIdFromLocalStorage } from "../../store/LocalStorage";
import applyPromoCode from "../../services/applyPromoCode";
import CartPopover from "../CartPopover/CartPopover";
import clearCart from "../../services/clearCart";

function Cart() {
  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState<ICart>();
  const toast = useToast();
  const cartId = getCartIdFromLocalStorage();

  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent) =>
    setInputValue((event.target as HTMLInputElement).value);

  useEffect(() => {
    async function getCart(cardId: string) {
      try {
        setLoading(true);
        const { cartData: data } = await getCartDetails(cardId);
        const { cartProducts, total } = data;
        setLoading(false);
        setCartData({ cartProducts, total });
      } catch (error) {
        setLoading(false);
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
  const onAppliedPromoCode = useCallback(
    async (discountCode: string) => {
      if (!cartId) {
        return;
      }
      try {
        const data = await applyPromoCode(cartId, discountCode);
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
    () => debounce(onChangeQuantity, 400),
    [onChangeQuantity],
  );

  const onClearCart = async () => {
    const productIds = cartData?.cartProducts?.map(
      (product) => product.productId,
    );
    if (cartId && productIds) {
      const data = await clearCart(cartId, productIds);
      setCartData(data);
    }
  };
  const navigateToCheckout = () => {
    navigate(`/checkout?cartId=${cartId}`, { state: { cartId } });
  };
  if (loading) {
    return <Spinner size="xl" />;
  }

  if (!cartData?.cartProducts?.length || !cartId) {
    return <EmptyCart />;
  }

  return (
    <Flex direction="column" alignItems="stretch" w={["100%", "100%", "80%"]}>
      <CartPopover onClearCart={onClearCart} />
      <Flex direction="column" px={["0", "0", "10px"]}>
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
        <Flex direction={["column", "column", "row"]}>
          <Input
            placeholder="PROMO CODE"
            w="180px"
            marginLeft="15px"
            borderRadius="0"
            onChange={(event) => handleChange(event)}
            mb="10px"
          />
          <Button
            color="white"
            bg="footerColorDark"
            p="20px 40px"
            fontWeight="400"
            borderRadius="0"
            mx="20px"
            _hover={{ bg: "blackAlpha.700" }}
            onClick={() => onAppliedPromoCode(inputValue)}
          >
            APPLY
          </Button>
        </Flex>
        <Flex direction="column">
          <Flex
            justifyContent="space-between"
            p="20px"
            bg="footerColorDark"
            color="white"
            mb="50px"
          >
            <Text>Cart total:</Text>
            <Text> {cartData?.total}</Text>
          </Flex>
          <Button
            w="100%"
            color="white"
            bg="footerColorDark"
            p="25px 50px"
            fontWeight="400"
            borderRadius="0"
            _hover={{ bg: "blackAlpha.700" }}
            onClick={navigateToCheckout}
          >
            CHECKOUT
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Cart;
