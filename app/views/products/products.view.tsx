import React from "react";
import { Container } from "./products.styled";
import { useLoaderData } from "@remix-run/react";
import type { ProductSettings } from "~/interfaces";
import { Product, Title } from "~/components";

export const ProductsView: React.FC = (): JSX.Element => {
  const products = useLoaderData<ProductSettings[]>();

  console.log(products);

  return (
    <Container>
      <Title title={'products'} />
      {products.map((product: ProductSettings): JSX.Element => (
        <Product key={product.id} {...product} />
      ))}
    </Container>
  )
}