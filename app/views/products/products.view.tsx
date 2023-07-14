import React from "react";
import { Title } from "~/components/title/title.component";
import { Container } from "./products.styled";
import { Product } from "~/components";
import { useLoaderData } from "@remix-run/react";
import type { ProductSettings } from "~/interfaces";

export const ProductsView: React.FC = (): JSX.Element => {
  const products = useLoaderData<ProductSettings[]>();
  
  return (
    <Container>
      <Title title={'products'} />
      {products.map((product: ProductSettings): JSX.Element => (
        <Product key={product.id} {...product} />
      ))}
    </Container>
  )
}