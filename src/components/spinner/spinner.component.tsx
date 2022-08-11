import { SpinnerContainer } from "./spinner.styles";

import { RiLoaderLine } from "react-icons/ri";

const Spinner = () => {
  return (
    <SpinnerContainer>
      <RiLoaderLine />
    </SpinnerContainer>
  );
};

export default Spinner;
