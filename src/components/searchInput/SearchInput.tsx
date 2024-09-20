import { useState } from 'react';

import './searchInput.css';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="searchInputWrapper">
      <div className="inner">
        {/* Pills */}

        {/* Search Input with suggestions */}
        <div className="inputContainer">
          <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search" />
          {/* Search suggestions */}
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
