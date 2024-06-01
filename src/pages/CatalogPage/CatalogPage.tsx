import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ProductProjection } from "@commercetools/platform-sdk";
import { ClientCredentialsFlowApiClient } from "../../services/apiClients";
import ProductsItem from "../../components/ProductsItem/ProductsItem";
import CatalogMenus from "../../components/CatalogMenus/CatalogMenus";
import parseProductDetails from "../../utils/parseProductDetails";

function CatalogPage() {
  const [products, setProducts] = useState<ProductProjection[]>([]);

  useEffect(() => {
    ClientCredentialsFlowApiClient()
      .productProjections()
      .get()
      .execute()
      .then((result) => setProducts(result.body.results))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function filter(filterArg: string) {
    ClientCredentialsFlowApiClient()
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: filterArg,
        },
      })
      .execute()
      .then((result) => setProducts(result.body.results))
      .catch((error) => {
        console.error(error);
      });
  }

  const HandleFilterByCustomAttribute = useCallback(
    (attribute: string, value: string) => {
      filter(`variants.attributes.${attribute}:"${value}"`);
    },
    [],
  );

  const HandleFilterByCategory = useCallback((id: string) => {
    filter(`categories.id: subtree("${id}")`);
  }, []);

  const HandleFilterByPrice = useCallback((value: number[]) => {
    filter(`variants.price.centAmount:range(${value[0]} to ${value[1]})`);
  }, []);

  function HandleSort(sortArg: string) {
    const productKeys = products.map(
      (product) => product.key,
    );
    const wherePredicate = productKeys
      .map((key) => `"${key}"`)
      .join(', ');

    ClientCredentialsFlowApiClient()
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: `key: ${wherePredicate}`,
          sort: sortArg,
        },
      })
      .execute()
      .then((result) => setProducts(result.body.results))
      .catch((error) => {
        console.error(error);
      });
  }

  function HandleSearch(value: string) {
    ClientCredentialsFlowApiClient()
      .productProjections()
      .search()
      .get({
        queryArgs: {
          "text.en-US": value,
        },
      })
      .execute()
      .then((result) => setProducts(result.body.results))
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <Flex justifyContent="space-between">
      <CatalogMenus
        HandleFilterByCustomAttribute={HandleFilterByCustomAttribute}
        HandleFilterByPrice={HandleFilterByPrice}
        HandleFilterByCategory={HandleFilterByCategory}
      />
      <Box>
        <Flex>
          <Input
            placeholder="Search"
            onChange={(e) => HandleSearch(e.target.value)}
          />
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Sort By
            </MenuButton>
            <MenuList>
            <MenuOptionGroup type='radio'>
              <MenuItemOption value="name" onClick={() => HandleSort("name.en-US asc")}>
                Name
              </MenuItemOption>
              <MenuItemOption value="asc" onClick={() => HandleSort("price asc")}>
                Price Ascending
              </MenuItemOption>
              <MenuItemOption value="desc" onClick={() => HandleSort("price desc")}>
                Price Descending
              </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Flex>
        <SimpleGrid columns={3} gap="1em" as="main">
          {products
            ? products.map((product) => {
                const productData = parseProductDetails(product);
                return (
                  <ProductsItem
                    name={productData?.title}
                    description={productData?.description}
                    imageURL={productData?.images[0]}
                    price={productData?.price}
                    discountedPrice={productData?.discountedPrice}
                  />
                );
              })
            : <Spinner alignSelf='center' />}
        </SimpleGrid>
      </Box>
    </Flex>
  );
}

export default CatalogPage;
