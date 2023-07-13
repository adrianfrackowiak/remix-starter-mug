import React from "react";
import type { TitleProps } from "./title.types";
import { Container } from "./title.styled";

export const Title: React.FC<TitleProps> = (props: TitleProps): JSX.Element => {
  const { title }: TitleProps = props;

  return (
    <Container>{title}</Container>
  );
};