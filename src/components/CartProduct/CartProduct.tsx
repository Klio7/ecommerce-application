import React from "react";
import {
  Flex,
  Image,
  Text,
  IconButton,
  Button,
  Input,
  useNumberInput,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { ICartProduct } from "../../types/types";
import changeProductQuantity from "../../services/changeProductQuantity";

function CartProduct({
  productId,
  imageUrl,
  title,
  price,
  number,
  totalProductPrice,
  setCartData,
}: ICartProduct) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: `${number}`,
      min: 1,
      max: 999,
    });

  const increment = getIncrementButtonProps();
  const decrement = getDecrementButtonProps();
  const input = getInputProps();
  async function onQuantityChange() {
    const cartData = await changeProductQuantity(
      "9ba8f627-278e-4fe4-b6e6-5b49c986b66b",
      productId,
      Number(input.value),
    );
    setCartData(cartData);
  }
  const handleQuantityChange = () => {
    onQuantityChange();
  };

  return (
    <Flex
      p="10px"
      w="100%"
      align="center"
      m="5px"
      gap="10px"
      borderBottom="2px solid"
      borderColor="footerColorDark"
    >
      <IconButton
        aria-label="Search database"
        icon={<SmallCloseIcon />}
        color="red.500"
        colorScheme="white"
        w="10%"
      />
      <Image src={imageUrl} alt="photo" boxSize="100px" />
      <Flex w="20%">
        <Text fontWeight="600" px="10px">
          {title}
        </Text>
      </Flex>
      <Flex w="20%" direction="column">
        <Text> {price}</Text>
      </Flex>
      <Flex w="20%" align="center">
        <Flex>
          <Button {...increment} onClick={() => handleQuantityChange()}>
            +
          </Button>
          <Input {...input} />
          <Button {...decrement} onClick={() => handleQuantityChange()}>
            -
          </Button>
        </Flex>
      </Flex>
      <Flex w="20%" color="orange.600">
        {totalProductPrice}
      </Flex>
    </Flex>
  );
}

export default CartProduct;
