import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Category } from "@commercetools/platform-sdk";
import { ClientCredentialsFlowApiClient } from "../../services/apiClients";

export default function CatalogMenus({
  HandleSortByColor,
}: {
  HandleSortByColor: (color: string) => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [colors, setColors] = useState<Set<string>>(new Set());
  const [sizes, setSizes] = useState<Set<string>>(new Set());

  useEffect(() => {
    ClientCredentialsFlowApiClient()
      .categories()
      .get()
      .execute()
      .then((result) => setCategories(result.body.results))
      .catch((error) => {
        console.error(error);
      });

    ClientCredentialsFlowApiClient()
      .products()
      .get()
      .execute()
      .then((response) => {
        const products = response.body.results;
        const colorsToSet = products.map((product) => {
          const { masterVariant } = product.masterData.current;
          return masterVariant.attributes![0].value;
        });
        const sizesToSet = products.map((product) => {
          const { masterVariant } = product.masterData.current;
          return masterVariant.attributes![1].value;
        });
        setColors(new Set(colorsToSet));
        setSizes(new Set(sizesToSet));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  function HandleColorClick(color: string) {
    HandleSortByColor(color);
  }

  return (
    <Flex flexDirection="column">
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Categories
        </MenuButton>
        <MenuList>
          {categories.map((category) => (
            <MenuItem>{category.name["en-US"]}</MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Price
        </MenuButton>
        <MenuList>
          <RangeSlider defaultValue={[0, 100]}>
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Color
        </MenuButton>
        <MenuList>
          {[...colors].map((color) => (
            <MenuItem onClick={() => HandleColorClick(color)}>{color}</MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Size
        </MenuButton>
        <MenuList>
          {[...sizes].map((size) => (
            <MenuItem>{size}</MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
}
