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
  const [selectedCategory, setSelectedCategory] = useState<string>('Categories');
  const [selectedPrice, setSelectedPrice] = useState<string>('Price');
  const [selectedColor, setSelectedColor] = useState<string>('Color');
  const [selectedSize, setSelectedSize] = useState<string>('Size');

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

  function HandleCustomAttributeClick(attribute: string, value: string) {
    if (attribute === 'Color') {
      setSelectedSize('Size');
      setSelectedCategory('Categories');
      setSelectedPrice('Price');
    }
    if (attribute === 'Size') {
      setSelectedColor('Color');
      setSelectedCategory('Categories');
      setSelectedPrice('Price');
    }
    HandleFilterByCustomAttribute(attribute, value);
  }

  function HandlePriceRangeChange(value: number[]) {
    setSelectedPrice(`${(value[0] / 100).toFixed(2)}$–${(value[1] / 100).toFixed(2)}$`)
    setSelectedSize('Size');
    setSelectedCategory('Categories');
    setSelectedColor('Color');
    HandleFilterByPrice(value);
  }

  return (
    <Flex flexDirection="column">
      <Menu>
        <MenuButton bgColor={selectedCategory !== 'Categories' ? '#ded6cb' : ''} as={Button} rightIcon={<ChevronDownIcon />}>
          {selectedCategory}
        </MenuButton>
        <MenuList>
          {categories.map((category) => (
            <MenuItem onClick={() => {HandleFilterByCategory(category.id); setSelectedCategory(category.name["en-US"]); setSelectedColor('Color'); setSelectedSize('Size'); setSelectedPrice('Price'); }}>
              {category.name["en-US"]}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton bgColor={selectedPrice !== 'Price' ? '#ded6cb' : ''} as={Button} rightIcon={<ChevronDownIcon />}>
          {selectedPrice}
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
      <Menu >
        <MenuButton bgColor={selectedColor !== 'Color' ? '#ded6cb' : ''} as={Button} rightIcon={<ChevronDownIcon />}>
          {selectedColor}
        </MenuButton>
        <MenuList>
          {[...colors].map((color) => (
            <MenuItem
              onClick={() => { HandleCustomAttributeClick("Color", color); setSelectedColor(color)}}
            >
              {color}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton bgColor={selectedSize !== 'Size' ? '#ded6cb' : ''} as={Button} rightIcon={<ChevronDownIcon />}>
          {selectedSize}
        </MenuButton>
        <MenuList>
          {[...sizes].map((size) => (
            <MenuItem onClick={() => { HandleCustomAttributeClick("Size", size); setSelectedSize(size) }}>
              {size}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
}
