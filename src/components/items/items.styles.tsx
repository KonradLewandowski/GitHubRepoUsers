import styled from "styled-components";

export const ItemsContainer = styled.div`
  color: white;
  padding: 1rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  position: absolute;
  max-height: 66vh;
  overflow-y: scroll;
  display: grid;

  gap: 0.3rem;

  .error {
    font-size: 1.4rem;
    color: #fd1e00;
  }

  .ok {
    color: #31cc23;
    font-size: 1.4rem;
  }
`;
