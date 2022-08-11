import { SpinnerContainer } from "./spinner.styles";

import { RiLoaderLine } from "react-icons/ri";

const Spinner = () => {
  return (
    <SpinnerContainer data-testid="spinner">
      <RiLoaderLine />
    </SpinnerContainer>
  );
};

export default Spinner;
