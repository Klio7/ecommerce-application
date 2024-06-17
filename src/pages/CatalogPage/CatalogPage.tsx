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
  Button,
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 6;
  const toast = useToast();


  const totalPages = Math.ceil(products.length / productsPerPage);


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

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
      setCurrentPage(1);
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
    setCurrentPage(1);
  }

  function HandleSearch(value: string) {
    ClientCredentialsFlowApiClient()
      .productProjections()
      .search()
      .get({
        queryArgs: {
          "text.en-US": value,
          fuzzy: true,
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
    setCurrentPage(1);
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

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i+=1) {
      pages.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          isDisabled={i === currentPage}
          mx={1}
          size="sm"
          bgColor={i === currentPage ? "#ded6cb" : "gray.200"}
        >
          {i}
        </Button>
      );
    }
    return pages;
  };



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
        <Flex mb={4}>
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
        <Grid className="grid" as="main" gap={4}>
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => {
              const productData = parseProductDetails(product);
              const productKey = product.key;
              return (
                <ProductsItem
                  key={productKey}
                  id={product.id}
                  product={productData}
                  productKey={productKey}
                />
              );
            })
          ) : (
            <Spinner
        thickness="4px"
        speed="0.65s"
        justifyContent="center"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
          )}
        </Grid>
        <Flex className="pagination-controls" justifyContent="center" mt={4}>
          {renderPagination()}
        </Flex>
      </Box>
    </Flex>
  );
}

export default CatalogPage;
