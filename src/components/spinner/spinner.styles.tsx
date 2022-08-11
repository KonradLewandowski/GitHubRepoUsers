import styled from "styled-components";

export const SpinnerContainer = styled.div`
  color: #31cc23;
  display: flex;
  justify-content: center;
  font-size: 4rem;
  position: absolute;
  left: calc(45%);
  transform: translateX(-50%);
  top: 35%;
  z-index: 3;
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
