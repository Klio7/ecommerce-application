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

  const HandleFilterByCustomAttribute = useCallback((attribute: string, color: string) => {
    ClientCredentialsFlowApiClient()
      .products()
      .get({
        queryArgs: {
          where: `masterData(current(masterVariant(attributes(name="${attribute}" and value="${color}"))))`,
        },
      })
      .execute()
      .then((result) => setProducts(result.body.results))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const HandleFilterByCategory = useCallback((id: string) => {
    ClientCredentialsFlowApiClient()
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: [`categories.id: subtree("${id}")`]
      },
    })
    .execute()
    .then(response => {
      const productProjections = response.body.results;
      const productKeys = productProjections.map(productProjection => productProjection.key);
      const wherePredicate = productKeys.map(key => `key="${key}"`).join(' or ');

      ClientCredentialsFlowApiClient()
      .products()
      .get({
        queryArgs: {
          where: wherePredicate,
        },
      })
      .execute()
      .then((result) => setProducts(result.body.results))
      .catch((error) => {
        console.error(error);
      });
  })
  }, []);
  
  const HandleFilterByPrice = useCallback((value: number[]) => {
    ClientCredentialsFlowApiClient()
      .products()
      .get({
        queryArgs: {
          where: `masterData(current(masterVariant(prices(value(centAmount < ${value[1]} and centAmount > ${value[0]})))))`,
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
      <CatalogMenus HandleFilterByCustomAttribute={HandleFilterByCustomAttribute} HandleFilterByPrice={HandleFilterByPrice} HandleFilterByCategory={HandleFilterByCategory} />
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
