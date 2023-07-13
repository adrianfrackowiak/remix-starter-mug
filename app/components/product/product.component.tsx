import React from "react";
import type { ProductProps } from "./product.types";
import { Container, DetailsBox, ImageBox, Img } from "./product.styled";

export const Product: React.FC<ProductProps> = (props: ProductProps): JSX.Element => {
  const { title, description, image, price }: ProductProps = props;

  return (
    <Container>
      <ImageBox>
        <Img src={image} alt={title} />  
      </ImageBox>  
      <DetailsBox>
        <div>{title}</div>
        <div>{description}</div>
        <div>{price}</div>
      </DetailsBox>
    </Container>
  );
};