import React from "react";
import { Container } from "./header.styled";
import { Link } from "@remix-run/react";

export const Header: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Link to='/'>Header</Link>
    </Container>
  );
};