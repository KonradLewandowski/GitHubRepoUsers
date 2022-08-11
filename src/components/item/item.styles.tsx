import styled from "styled-components";

export const ItemContainer = styled.div`
  border: 1px solid lightblue;
  margin: 5px;
  padding: 5px;

  &.active,
  &:hover {
    background: #9c9c9c39;
  }

  &:hover {
    cursor: pointer;
  }
`;
