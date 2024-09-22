import { Dispatch, ReactNode, SetStateAction } from 'react';

import './searchInput.css';

type Props<T> = {
  options: T[];
  selectedOptions: T[];
  renderSelectedItem: (option: T) => ReactNode;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  renderOption: (option: T) => ReactNode;
  onSuggestionSelected: (option: T) => void;
};

const SearchInput = <T,>({
  options,
  selectedOptions,
  renderSelectedItem,
  searchTerm,
  setSearchTerm,
  renderOption,
  onSuggestionSelected,
}: Props<T>) => {
  return (
    <div className="searchInputWrapper">
      <div className="flex inner">
        {selectedOptions.map((selectedOption, index) => (
          <div key={index}>{renderSelectedItem(selectedOption)}</div>
        ))}
        <div className="inputContainer">
          <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search" />
          {options.length > 0 ? (
            <ul className="suggestionsList">
              {options.map((option, index) => (
                <li key={index} onClick={() => onSuggestionSelected(option)}>
                  {renderOption(option)}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
