import { Dispatch, ReactNode, SetStateAction } from 'react';
import './searchInput.css';

type Props<T> = {
  options: T[];
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  renderOption: (option: T) => ReactNode;
};

const SearchInput = <T,>({ options, searchTerm, setSearchTerm, renderOption }: Props<T>) => {
  return (
    <div className="searchInputWrapper">
      <div className="inner">
        <div className="inputContainer">
          <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search" />
          <ul>
            {options.map((option, index) => (
              <li key={index}>{renderOption(option)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
