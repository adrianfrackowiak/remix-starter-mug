import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  max-height: 400px;
  padding: 20px;
  border-radius: 10px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;

  & + & {
    margin-top: 50px;
  }
`;

export const ImageBox = styled.div`
  width: 50%;
  height: 100%;
`;

export const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

export const DetailsBox = styled.div`
  width: 50%;
`;