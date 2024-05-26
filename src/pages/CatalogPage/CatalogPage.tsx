import React, { useCallback, useEffect, useState } from "react";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { Product } from "@commercetools/platform-sdk";
import { ClientCredentialsFlowApiClient } from "../../services/apiClients";
import ProductsItem from "../../components/ProductsItem/ProductsItem";
import CatalogMenus from "../../components/CatalogMenus/CatalogMenus";
import parseProductDetails from "../../utils/parseProductDetails";

function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    ClientCredentialsFlowApiClient()
      .products()
      .get()
      .execute()
      .then((result) => setProducts(result.body.results))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const HandleSortByColor = useCallback((color: string) => {
    ClientCredentialsFlowApiClient()
      .products()
      .get({
        queryArgs: {
          where: `masterData(current(masterVariant(attributes(name="Color" and value="${color}"))))`,
        },
      })
      .execute()
      .then((result) => setProducts(result.body.results))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Flex justifyContent="space-between">
      <CatalogMenus HandleSortByColor={HandleSortByColor} />
      <SimpleGrid columns={3} gap="1em" as="main">
        {products
          ? products.map((product) => {
              const productData = parseProductDetails(
                product.masterData.current,
              );
              return (
                <ProductsItem
                  name={productData?.title}
                  description={productData?.description}
                  imageURL={productData?.images[0]}
                  price={productData?.price}
                  discountedPrice={`${product.masterData.current.masterVariant.prices![0].discounted?.value.centAmount}`}
                />
              );
            })
          : "Loading..."}
      </SimpleGrid>
    </Flex>
  );
}

export default CatalogPage;
