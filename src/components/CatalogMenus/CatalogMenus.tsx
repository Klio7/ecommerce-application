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
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Category } from "@commercetools/platform-sdk";
import { ClientCredentialsFlowApiClient } from "../../services/apiClients";

export default function CatalogMenus({
  HandleFilterByCustomAttribute,
  HandleFilterByPrice,
  HandleFilterByCategory,
  searchValue,
  breadcrumbs,
  setBreadcrumbs,
}: {
  HandleFilterByCustomAttribute: (attribute: string, value: string) => void;
  HandleFilterByPrice: (value: number[]) => void;
  HandleFilterByCategory: (id: string) => void;
  searchValue: string;
  breadcrumbs: string[][];
  setBreadcrumbs: React.Dispatch<React.SetStateAction<string[][]>>;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [colors, setColors] = useState<Set<string>>(new Set());
  const [sizes, setSizes] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Categories");
  const [selectedPrice, setSelectedPrice] = useState<string>("Price");
  const [selectedColor, setSelectedColor] = useState<string>("Color");
  const [selectedSize, setSelectedSize] = useState<string>("Size");
  const toast = useToast();

  useEffect(() => {
    ClientCredentialsFlowApiClient()
      .categories()
      .get({
        queryArgs: {
          limit: 30,
        },
      })
      .execute()
      .then((result) => setCategories(result.body.results))
      .catch((error) => {
        toast({
          position: "top",
          title: "Error",
          description: `An error occured: ${error}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
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
        toast({
          position: "top",
          title: "Error",
          description: `An error occured: ${error}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }, [toast]);

  useEffect(() => {
    if (searchValue !== "") {
      setSelectedSize("Size");
      setSelectedCategory("Categories");
      setSelectedPrice("Price");
      setSelectedColor("Color");
      setBreadcrumbs([[], []]);
    }
  }, [searchValue, setBreadcrumbs, toast]);

  useEffect(() => {
    if (breadcrumbs[0][breadcrumbs[0].length - 1] !== selectedCategory) {
      setSelectedCategory(breadcrumbs[0][breadcrumbs[0].length - 1]);
    }
    if (breadcrumbs[0].length === 0) setSelectedCategory("Categories");
  }, [breadcrumbs, selectedCategory]);

  function HandleCustomAttributeClick(attribute: string, value: string) {
    if (attribute === "Color") {
      setSelectedSize("Size");
      setSelectedCategory("Categories");
      setSelectedPrice("Price");
      setBreadcrumbs([[], []]);
    }
    if (attribute === "Size") {
      setSelectedColor("Color");
      setSelectedCategory("Categories");
      setSelectedPrice("Price");
      setBreadcrumbs([[], []]);
    }
    HandleFilterByCustomAttribute(attribute, value);
  }

  function HandlePriceRangeChange(value: number[]) {
    setSelectedPrice(
      `${(value[0] / 100).toFixed(2)}$–${(value[1] / 100).toFixed(2)}$`,
    );
    setSelectedSize("Size");
    setSelectedCategory("Categories");
    setSelectedColor("Color");
    setBreadcrumbs([[], []]);
    HandleFilterByPrice(value);
  }

  function HandleResetFilters() {
    setSelectedSize("Size");
    setSelectedCategory("Categories");
    setSelectedColor("Color");
    setSelectedPrice("Price");
    setBreadcrumbs([[], []]);
    HandleFilterByPrice([0, 30000]);
  }

  return (
    <Flex flexDirection="column">
      <Menu>
        <MenuButton
          bgColor={selectedCategory !== "Categories" ? "#ded6cb" : ""}
          as={Button}
          rightIcon={<ChevronDownIcon />}
        >
          {selectedCategory}
        </MenuButton>
        <MenuList>
          {categories.map((category) => {
            if (!category.parent)
              return (
                <React.Fragment key={category.id}>
                  <MenuItem
                    fontWeight="bold"
                    onClick={() => {
                      HandleFilterByCategory(category.id);
                      setBreadcrumbs([[category.name["en-US"]], [category.id]]);
                      setSelectedCategory(category.name["en-US"]);
                      setSelectedColor("Color");
                      setSelectedSize("Size");
                      setSelectedPrice("Price");
                    }}
                  >
                    {category.name["en-US"]}
                  </MenuItem>
                  {categories.map((subcategory) => {
                    if (subcategory.parent?.id === category.id) {
                      return (
                        <MenuItem
                          key={subcategory.id}
                          onClick={() => {
                            HandleFilterByCategory(subcategory.id);
                            setBreadcrumbs([
                              [
                                category.name["en-US"],
                                subcategory.name["en-US"],
                              ],
                              [category.id, subcategory.id],
                            ]);
                            setSelectedCategory(subcategory.name["en-US"]);
                            setSelectedColor("Color");
                            setSelectedSize("Size");
                            setSelectedPrice("Price");
                          }}
                        >
                          {subcategory.name["en-US"]}
                        </MenuItem>
                      );
                    }
                    return null;
                  })}
                </React.Fragment>
              );
            return null;
          })}
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton
          bgColor={selectedPrice !== "Price" ? "#ded6cb" : ""}
          as={Button}
          rightIcon={<ChevronDownIcon />}
        >
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
      <Menu>
        <MenuButton
          bgColor={selectedColor !== "Color" ? "#ded6cb" : ""}
          as={Button}
          rightIcon={<ChevronDownIcon />}
        >
          {selectedColor}
        </MenuButton>
        <MenuList>
          {[...colors].map((color) => (
            <MenuItem
              key={color}
              onClick={() => {
                HandleCustomAttributeClick("Color", color);
                setSelectedColor(color);
              }}
            >
              {color}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton
          bgColor={selectedSize !== "Size" ? "#ded6cb" : ""}
          as={Button}
          rightIcon={<ChevronDownIcon />}
        >
          {selectedSize}
        </MenuButton>
        <MenuList>
          {[...sizes].map((size) => (
            <MenuItem
              key={size}
              onClick={() => {
                HandleCustomAttributeClick("Size", size);
                setSelectedSize(size);
              }}
            >
              {size}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Button marginTop="1em" onClick={() => HandleResetFilters()}>
        Reset Filters
      </Button>
    </Flex>
  );
}
