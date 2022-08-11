import styled from "styled-components";

export const SpinnerContainer = styled.div`
  color: #31cc23;
  display: grid;
  justify-content: center;
  font-size: 4rem;
  position: absolute;
  left: 50%;
  right: 50%;
  top: 40%;
  z-index: 2;
  animation: rotation 1.2s infinite linear;

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;
