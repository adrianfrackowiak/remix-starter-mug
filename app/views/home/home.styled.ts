import { Link } from "@remix-run/react";
import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 10px;
  background: black;
  margin: 20px;

  & + & {
    margin-left: 20px;
  }
`;

export const SwiperContainer = styled.div`
  max-width: 600px;
  width: 100%;
  height: 400px;
  margin-top: 100px;
`;