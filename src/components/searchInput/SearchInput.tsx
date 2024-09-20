import { useState } from 'react';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      {/* Pills */}

      {/* Search Input with suggestions */}
      <div>
        <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search" />
      </div>
    </div>
  );
};

export default SearchInput;
