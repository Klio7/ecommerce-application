import React from "react";
import {
  Flex,
  Image,
  Text,
  IconButton,
  Button,
  Input,
  useNumberInput,
  Tooltip,
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
      textAlign="center"
    >
      <Tooltip label="Remove from cart" font-size="lg" openDelay={200}>
        <IconButton
          aria-label="Search database"
          icon={<SmallCloseIcon />}
          color="red.500"
          colorScheme="white"
          w="10%"
          transition="0.3s linear all"
          _hover={{
            transform: "scale(1.4)",
          }}
          onClick={() => handleQuantityChange(productId, "0")}
        />
      </Tooltip>
      <Image src={imageUrl} alt="photo" boxSize="100px" />
      <Flex w="25%" justify="center">
        <Text fontWeight="600" px="10px">
          {title}
        </Text>
      </Flex>
      <Flex w="20%" direction="column">
        <Text> {price}</Text>
      </Flex>
      <Flex w="22%" align="center">
        <Flex justify="center">
          <Button
            {...increment}
            onClick={() => handleQuantityChange(productId, input.value)}
            colorScheme="white"
            color="black"
          >
            +
          </Button>
          <Input {...input} w="60px" />
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
      <Flex w="20%" color="orange.600" justify="center">
        {totalProductPrice}
      </Flex>
    </Flex>
  );
}

export default CartProduct;
