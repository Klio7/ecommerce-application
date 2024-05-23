import { ClientCredentialsFlowApiClient } from "./apiClients";

async function getProduct(key: string) {
  const data = await ClientCredentialsFlowApiClient()
    .products()
    .withKey({ key })
    .get()
    .execute();

  const { name, description } = data.body.masterData.current;
  const title = name["en-US"];
  const productDescription = description!["en-US"];
  const { images, prices } = data.body.masterData.current.masterVariant;
  // const firstImage = images![0];
  const price = `${(prices![0].value.centAmount / 100).toFixed(2)}$`;
  return { title, productDescription, images, price };
}
export default getProduct;
