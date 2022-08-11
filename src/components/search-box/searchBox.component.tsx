import { SearchBoxContainer } from "./searchBox.styles";

import Autocomplete from "../autocomplete/autocomplete";

import { GitHubSearchResponse } from "../../implementation/GitHubSearchResponse";

const SearchBox = () => {
  return (
    <SearchBoxContainer>
      <Autocomplete repo={new GitHubSearchResponse()} data-testid="autocomplete-box" />
    </SearchBoxContainer>
  );
};

export default SearchBox;
