import { SearchBoxContainer } from "./searchBox.styles";

import Autocomplete from "../autocomplete/autocomplete";

import { gitHubSearchService } from "../../implementation/GitHubSearchService";

const SearchBox = () => {
  return (
    <SearchBoxContainer>
      <Autocomplete
        gitHubSearchService={gitHubSearchService}
        data-testid="autocomplete-box"
      />
    </SearchBoxContainer>
  );
};

export default SearchBox;
