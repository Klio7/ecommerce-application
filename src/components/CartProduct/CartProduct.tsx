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
import { ISetCartProducts } from "../../types/types";

function CartProduct({
  productId,
  imageUrl,
  title,
  price,
  number,
  totalProductPrice,
  handleQuantityChange,
}: ISetCartProducts) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: `${number}`,
      min: 1,
      max: 999,
    });

  const increment = getIncrementButtonProps();
  const decrement = getDecrementButtonProps();
  const input = getInputProps(
    (oninput = () => {
      handleQuantityChange(productId, input.value);
    }),
  );

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
        onClick={() => handleQuantityChange(productId, "0")}
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
          <Button
            {...increment}
            onClick={() => handleQuantityChange(productId, input.value)}
            colorScheme="white"
            color="black"
          >
            +
          </Button>
          <Input {...input} />
          <Button
            {...decrement}
            onClick={() => handleQuantityChange(productId, input.value)}
            colorScheme="white"
            color="black"
          >
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
