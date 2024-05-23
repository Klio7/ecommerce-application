import React, { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { Product } from "@commercetools/platform-sdk";
import { ClientCredentialsFlowApiClient } from "../../services/ApiClients";
import ProductsItem from "../../components/ProductsItem/ProductsItem";

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

  return (
    <SimpleGrid columns={3} as="main">
      {products
        ? products.map((product) => (
            <ProductsItem
              name={product.masterData.current.name["en-US"]}
              description={product.masterData.current.description!["en-US"]}
              imageURL={product.masterData.current.masterVariant.images![0].url}
            />
          ))
        : "Loading..."}
    </SimpleGrid>
  );
}

export default CatalogPage;
