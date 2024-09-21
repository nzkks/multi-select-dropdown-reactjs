import { useEffect, useState } from 'react';

import SearchInput from '../searchInput/SearchInput';

// type APIResponse = Record<string, unknown>;
type APIResponseType = {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
};
type UserData = Pick<APIResponseType, 'id' | 'firstName' | 'lastName' | 'image'>;

const UserSearchWrapper = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const handleSearchUsers = async (searchTerm: string) => {
      try {
        // I am aware that, this dummyjson APIs allows to specify the needed keys like `https://dummyjson.com/users/search?q=${searchTerm}&select=id,firstName,lastName,image`.
        const response = await fetch(`https://dummyjson.com/users/search?q=${searchTerm}`);
        const data = await response.json();
        const usersData: UserData[] = data.users.map((user: APIResponseType) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
        }));

        setUsers(usersData);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchTerm.trim() === '') {
      setUsers([]);
      return;
    }

    handleSearchUsers(searchTerm);
  }, [searchTerm]);

  return (
    <SearchInput
      options={users}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      renderOption={user => (
        <div>
          <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
          <span>{`${user.firstName} ${user.lastName}`}</span>
        </div>
      )}
    />
  );
};

export default UserSearchWrapper;
