import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  Button,
} from "@chakra-ui/react";
import { IOnClearCart } from "../../types/types";

function CartPopover({ onClearCart }: IOnClearCart) {
  return (
    <Popover closeOnBlur={false}>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button>Clear Cart </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>
                Do you really want to clear your cart?
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Button
                  bg="teal.500"
                  color="white"
                  mr="20px"
                  px="25px"
                  onClick={() => onClearCart()}
                  _hover={{ bg: "teal.300" }}
                >
                  Yes
                </Button>
                <Button
                  bg="red.600"
                  color="white"
                  px="30px"
                  onClick={onClose}
                  _hover={{ bg: "red.300" }}
                >
                  No
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}

export default CartPopover;
