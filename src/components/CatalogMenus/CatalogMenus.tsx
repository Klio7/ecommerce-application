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
  HandleFilterByCustomAttribute,
  HandleFilterByPrice,
  HandleFilterByCategory,
}: {
  HandleFilterByCustomAttribute: (attribute: string, value: string) => void;
  HandleFilterByPrice: (value: number[]) => void;
  HandleFilterByCategory: (id: string) => void;
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

  function HandleCustomAttributeClick(attribute: string, color: string) {
    HandleFilterByCustomAttribute(attribute, color);
  }

  function HandlePriceRangeChange(value: number[]) {
    HandleFilterByPrice(value);
  }

  return (
    <Flex flexDirection="column">
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Categories
        </MenuButton>
        <MenuList>
          {categories.map((category) => (
            <MenuItem onClick={() => HandleFilterByCategory(category.id)}>
              {category.name["en-US"]}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Price
        </MenuButton>
        <MenuList>
          <RangeSlider
            defaultValue={[0, 30000]}
            max={30000}
            onChangeEnd={(val) => HandlePriceRangeChange(val)}
          >
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
            <MenuItem
              onClick={() => HandleCustomAttributeClick("Color", color)}
            >
              {color}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Size
        </MenuButton>
        <MenuList>
          {[...sizes].map((size) => (
            <MenuItem onClick={() => HandleCustomAttributeClick("Size", size)}>
              {size}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
}
