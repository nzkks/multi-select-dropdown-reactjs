import { useEffect, useState } from 'react';
import SearchInput from '../searchInput/SearchInput';

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
    const controller = new AbortController();

    const handleSearchUsers = async (searchTerm: string) => {
      try {
        // I am aware that, this dummyjson APIs allows to specify the needed keys like `https://dummyjson.com/users/search?q=${searchTerm}&select=id,firstName,lastName,image`.
        const response = await fetch(`https://dummyjson.com/users/search?q=${searchTerm}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const usersData: UserData[] = data.users.map((user: APIResponseType) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
        }));

        setUsers(usersData);
      } catch (error: unknown) {
        if (error instanceof Error && error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Fetch error:', error);
        }
      }
    };

    if (searchTerm.trim() === '') {
      setUsers([]);
      return;
    }

    handleSearchUsers(searchTerm);

    return () => controller.abort();
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
