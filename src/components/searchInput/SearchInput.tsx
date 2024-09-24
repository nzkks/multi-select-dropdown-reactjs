import { Dispatch, KeyboardEvent, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';

import './searchInput.css';

type Props<T> = {
  options: T[];
  setOptions: Dispatch<SetStateAction<T[]>>;
  selectedOptions: T[];
  renderSelectedItem: (option: T) => ReactNode;
  onRemoveSelectedOption: (option: T) => void;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  renderOption: (option: T) => ReactNode;
  onOptionSelected: (option: T) => void;
};

const SearchInput = <T,>({
  options,
  setOptions,
  selectedOptions,
  renderSelectedItem,
  onRemoveSelectedOption,
  searchTerm,
  setSearchTerm,
  renderOption,
  onOptionSelected,
}: Props<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(options.length > 0);
  }, [options]);

  const handleOptionSelected = (option: T) => {
    onOptionSelected(option);
    inputRef?.current?.focus();
  };

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    const inputTarget = inputRef.current;
    if (inputTarget === null) return;

    if (e.key === 'Escape' && options.length > 0 && isOpen) {
      setOptions([]);
      setIsOpen(false);
    }

    if (e.key === 'Backspace') {
      if (inputTarget?.value === '' && selectedOptions.length > 0) {
        onRemoveSelectedOption(selectedOptions[selectedOptions.length - 1]);
      }
    }
    return;
  };

  return (
    <div className="searchInputWrapper">
      <div className="flex inner">
        {selectedOptions.map((selectedOption, index) => (
          <div key={index} className="flex">
            {renderSelectedItem(selectedOption)}
            <div className="closeBtn" onClick={() => onRemoveSelectedOption(selectedOption)}>
              &times;
            </div>
          </div>
        ))}
        <div className="inputContainer">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={handleInputKeydown}
            placeholder="Search"
          />
          {options.length > 0 ? (
            <ul className="suggestionsList">
              {options.map((option, index) => (
                <li key={index} onClick={() => handleOptionSelected(option)}>
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
