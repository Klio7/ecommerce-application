import React, { useState, useEffect } from "react";
import { Flex, Text, useToast, Input, Button } from "@chakra-ui/react";
import getCartDetails from "../../services/getCartDetails";
import { ICart } from "../../types/types";

function Checkout({ cartId }: { cartId: string }) {
  const [cartData, setCartData] = useState<ICart>();
  const toast = useToast();

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
    getCart(cartId);
  }, [toast, cartId]);
  return (
    <Flex justifyContent="space-around" w="100%">
      <Flex direction="column" p="10px" w={["50%", "50%", "60%"]}>
        <Text fontWeight="600" mb="20px">
          Billing Details
        </Text>
        <Text>First Name</Text>
        <Input placeholder="First Name" mb="15px" />
        <Text>Last Name</Text>
        <Input placeholder="Last Name" mb="15px" />
        <Text>Country</Text>
        <Input placeholder="Country" mb="15px" />
        <Text>City</Text>
        <Input placeholder="City" mb="15px" />
        <Text>Street</Text>
        <Input placeholder="Street" mb="15px" />
        <Text>Billing address</Text>
        <Input placeholder="Billing address" mb="15px" />
        <Text>Shipping address</Text>
        <Input placeholder="Shipping address" mb="15px" />
        <Button mb="15px" color="white" bg="black" borderRadius="0">
          CONTINUE TO SHIPPING
        </Button>
      </Flex>
      <Flex
        direction="column"
        border="2px solid"
        justifyContent="flex-start"
        h="fit-content"
        w={["50%", "50%", "30%"]}
        p="10px"
      >
        <Text>Products</Text>
        {cartData?.cartProducts?.map((product) => (
          <Flex key={product.title} gap="20px">
            <Flex fontWeight="600"> {product.title}</Flex>
            <Flex> {product.number}</Flex>
            <Flex> {product.totalProductPrice}</Flex>
          </Flex>
        ))}

        <Flex fontWeight="600">TOTAL: {cartData?.total}</Flex>
      </Flex>
    </Flex>
  );
}

export default Checkout;
