import { Dispatch, ReactNode, SetStateAction } from 'react';
import './searchInput.css';

type Props<T> = {
  options: T[];
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  renderOption: (option: T) => ReactNode;
  onSuggestionSelected: (option: T) => void;
};

const SearchInput = <T,>({ options, searchTerm, setSearchTerm, renderOption, onSuggestionSelected }: Props<T>) => {
  return (
    <div className="searchInputWrapper">
      <div className="inner">
        <div className="inputContainer">
          <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search" />
          <ul className="suggestionsList">
            {options.map((option, index) => (
              <li key={index} onClick={() => onSuggestionSelected(option)}>
                {renderOption(option)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
