import { Fragment } from "react";

import { GlobalStyle } from "./components/global-styles/globalStyles.styles";

import { Main } from "./components/main/main.component";

const App = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <Main />
    </Fragment>
  );
};

export default App;
