import { FC, useState, useEffect, ChangeEvent } from "react";

import { Service, Result } from "../../interfaces/Service";

import Spinner from "../spinner/spinner.component";
import Items from "../items/items.component";

import { AutocompleteContainer } from "./autocomplete.styles";

type Autocompleteprops = {
  gitHubSearchService: Service;
};

const Autocomplete: FC<Autocompleteprops> = ({ gitHubSearchService }) => {
  const [searchField, setSearchField] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [filteredResults, setFilteredResults] = useState(results);
  const [isSearching, setIsSearching] = useState(false);
  const [isError, setIsError] = useState(false);

  const typingResult = async () => {
    try {
      setIsSearching(true);
      const items = await gitHubSearchService(searchField);
      setResults(items);
      setIsError(false);
      setIsSearching(false);
    } catch (error) {
      setIsError(true);
      setIsSearching(false);
      setTimeout(() => {
        setIsError(false);
      }, 4000);
    }
  };

  useEffect(() => {
    if (searchField.length < 3) return setResults([]);
    typingResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchField]);

  useEffect(() => {
    const newFilteredResults = results
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter((newResult) => {
        return newResult.name.toLowerCase().startsWith(searchField);
      })
      .slice(0, 50);

    setFilteredResults(newFilteredResults);
  }, [results, searchField]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearchField(value.toLowerCase());
  };

  return (
    <AutocompleteContainer data-testid="autocomplete-container">
      <input type="text" onChange={onSearchChange} placeholder="search" />
      {isSearching ? <Spinner /> : null}
      <Items items={filteredResults} isError={isError} />
    </AutocompleteContainer>
  );
};

export default Autocomplete;
