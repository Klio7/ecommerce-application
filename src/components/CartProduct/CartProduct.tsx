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
  Highlight,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { ISetCartProducts } from "../../types/types";

function CartProduct({
  productId,
  imageUrl,
  title,
  discountedCartPrice,
  discountedPrice,
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
      onChange: (valueAsString) => {
        if (valueAsString && Number(valueAsString) !== 0) {
          handleQuantityChange(productId, valueAsString);
        }
      },
    });

  const increment = getIncrementButtonProps();
  const decrement = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <Flex
      py="10px"
      px={["0", "5px", "10px"]}
      w="100%"
      align="center"
      my="5px"
      gap={["0", "0", "10px"]}
      borderBottom="2px solid"
      borderColor="footerColorDark"
      textAlign="center"
      fontSize={["sm", "md", "lg"]}
    >
      <Tooltip label="Remove from cart" font-size="lg" openDelay={200}>
        <IconButton
          aria-label="Search database"
          icon={<SmallCloseIcon />}
          color="red.500"
          colorScheme="white"
          fontSize={["xs", "lg"]}
          w={["3%", "5%", "10%"]}
          transition="0.3s linear all"
          _hover={{
            transform: "scale(1.4)",
          }}
          onClick={() => handleQuantityChange(productId, "0")}
        />
      </Tooltip>
      <Image src={imageUrl} alt="photo" boxSize={["50px", "50px", "100px"]} />
      <Flex w="25%" justify="center">
        <Text fontWeight="600" px="10px">
          {title}
        </Text>
      </Flex>
      <Flex w={["10%", "10%", "20%"]} direction="column">
        {!discountedPrice && !discountedCartPrice && <Text> {price}</Text>}
        {discountedPrice && !discountedCartPrice && (
          <Text>
            <Highlight
              query={`${price}`}
              styles={{
                textDecorationLine: "line-through",
                color: "black",
                fontSize: "sm",
              }}
            >
              {`${discountedPrice}
              ${price}`}
            </Highlight>
          </Text>
        )}
        {!discountedPrice && discountedCartPrice && (
          <Flex direction="column">
            <Highlight
              query={`${discountedCartPrice}`}
              styles={{
                bg: "orange.300",
                p: "4px",
              }}
            >
              {discountedCartPrice}
            </Highlight>

            <Highlight
              query={`${price}`}
              styles={{
                textDecorationLine: "line-through",
                color: "black",
                fontSize: "sm",
              }}
            >
              {`${price}`}
            </Highlight>
          </Flex>
        )}
        {discountedPrice && discountedCartPrice && (
          <Flex direction="column">
            <Highlight
              query={`${discountedCartPrice}`}
              styles={{
                bg: "orange.300",
                p: "4px",
              }}
            >
              {discountedCartPrice}
            </Highlight>

            <Highlight
              query={`${discountedPrice}`}
              styles={{
                textDecorationLine: "line-through",
                color: "black",
                fontSize: "sm",
              }}
            >
              {`${discountedPrice}`}
            </Highlight>
            <Highlight
              query={`${price}`}
              styles={{
                textDecorationLine: "line-through",
                color: "gray.500",
                fontSize: "xs",
              }}
            >
              {`${price}`}
            </Highlight>
          </Flex>
        )}
      </Flex>
      <Flex w={["34%", "34%", "22%"]} align="center" justify="center">
        <Flex justify="center" fontSize={["xs", "xs", "xs", "md"]}>
          <Button
            {...increment}
            onClick={() => handleQuantityChange(productId, input.value)}
            colorScheme="white"
            color="black"
            p="0"
          >
            +
          </Button>
          <Input {...input} w={["45px", "60px"]} py="2px" />
          <Button
            {...decrement}
            onClick={() => {
              handleQuantityChange(productId, input.value);
            }}
            colorScheme="white"
            color="black"
            p="0"
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
