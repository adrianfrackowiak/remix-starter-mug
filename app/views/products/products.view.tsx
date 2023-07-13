import React from "react";
import { Title } from "~/components/title/title.component";
import { Container } from "./products.styled";

export const ProductsView: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Title title={'products'} />
    </Container>
  )
}