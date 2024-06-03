import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Grid,
  Input,
  Select,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { ProductProjection } from "@commercetools/platform-sdk";
import { ClientCredentialsFlowApiClient } from "../../services/apiClients";
import ProductsItem from "../../components/ProductsItem/ProductsItem";
import CatalogMenus from "../../components/CatalogMenus/CatalogMenus";
import parseProductDetails from "../../utils/parseProductDetails";
import "./CatalogPage.scss";

function CatalogPage() {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [sortValue, setSortValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [breadcrumbs, setBreadcrumbs] = useState<string[][]>([[], []]);
  const toast = useToast();

  useEffect(() => {
    ClientCredentialsFlowApiClient()
      .productProjections()
      .get()
      .execute()
      .then((result) => setProducts(result.body.results))
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

  const filter = useCallback(
    (filterArg: string) => {
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
          toast({
            position: "top",
            title: "Error",
            description: `An error occured: ${error}`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
      setSortValue("");
      setSearchValue("");
    },
    [toast],
  );

  const HandleFilterByCustomAttribute = useCallback(
    (attribute: string, value: string) => {
      filter(`variants.attributes.${attribute}:"${value}"`);
    },
    [filter],
  );

  const HandleFilterByCategory = useCallback(
    (id: string) => {
      filter(`categories.id: subtree("${id}")`);
    },
    [filter],
  );

  const HandleFilterByPrice = useCallback(
    (value: number[]) => {
      filter(`variants.price.centAmount:range(${value[0]} to ${value[1]})`);
    },
    [filter],
  );

  function HandleSort(sortArg: string) {
    setSortValue(sortArg);

    const productKeys = products.map((product) => product.key);
    const wherePredicate = productKeys.map((key) => `"${key}"`).join(", ");

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
        toast({
          position: "top",
          title: "Error",
          description: `An error occured: ${error}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
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
        toast({
          position: "top",
          title: "Error",
          description: `An error occured: ${error}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
    setSearchValue(value);
    setSortValue("");
  }

  function HandleBreadcrumbsClick(crumb: string) {
    if (crumb !== breadcrumbs[0][breadcrumbs[0].length - 1]) {
      setBreadcrumbs([
        breadcrumbs[0].slice(0, breadcrumbs[0].indexOf(crumb) + 1),
        breadcrumbs[1].slice(0, breadcrumbs[0].indexOf(crumb) + 1),
      ]);
      HandleFilterByCategory(breadcrumbs[1][breadcrumbs[0].indexOf(crumb)]);
    }
  }

  return (
    <Flex className="catalog-page-wrapper">
      <CatalogMenus
        HandleFilterByCustomAttribute={HandleFilterByCustomAttribute}
        HandleFilterByPrice={HandleFilterByPrice}
        HandleFilterByCategory={HandleFilterByCategory}
        searchValue={searchValue}
        breadcrumbs={breadcrumbs}
        setBreadcrumbs={setBreadcrumbs}
      />
      <Box flexGrow={1}>
        <Flex>
          <Input
            placeholder="Search"
            onChange={(e) => {
              HandleSearch(e.target.value);
            }}
            value={searchValue}
          />
          <Select
            value={sortValue}
            onChange={(e) => HandleSort(e.target.value)}
            w="9em"
            placeholder="Sort By"
          >
            <option value="name.en-US asc">Name</option>
            <option value="price asc">Price ↑</option>
            <option value="price desc">Price ↓</option>
          </Select>
        </Flex>
        <Breadcrumb>
          <BreadcrumbItem key="Catalog">
            <BreadcrumbLink>Catalog</BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbs[0].map((crumb) => (
            <BreadcrumbItem key={crumb}>
              <BreadcrumbLink onClick={() => HandleBreadcrumbsClick(crumb)}>
                {crumb}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
        <Grid className="grid" as="main">
          {products ? (
            products.map((product) => {
              const productData = parseProductDetails(product);
              const productKey = product.key;
              return (
                <ProductsItem
                  key={productData?.title}
                  name={productData?.title}
                  description={productData?.description}
                  imageURL={productData?.images[0]}
                  price={productData?.price}
                  discountedPrice={productData?.discountedPrice}
                  productKey={productKey}
                />
              );
            })
          ) : (
            <Spinner alignSelf="center" />
          )}
        </Grid>
      </Box>
    </Flex>
  );
}

export default CatalogPage;
