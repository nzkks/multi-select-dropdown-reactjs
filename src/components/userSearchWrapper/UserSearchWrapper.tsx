import { useCallback, useEffect, useState } from 'react';
import SearchInput from '../searchInput/SearchInput';

import './userSearch.css';
import UserOption from './UserOption';

function debounce<T extends (...args: Parameters<T>) => void>(
  callbackFn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callbackFn(...args);
    }, delay);
  };
}

type APIResponseType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};
type UserData = Pick<APIResponseType, 'id' | 'firstName' | 'lastName' | 'email' | 'image'>;

const UserSearchWrapper = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [users, setUsers] = useState<UserData[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserData[]>([]);
  const [selectedUsersSet, setSelectedUsersSet] = useState<Set<string>>(new Set());

  const handleSearchUsers = async (searchTerm: string) => {
    try {
      // I am aware that, this dummyjson APIs allows to specify the needed keys like `https://dummyjson.com/users/search?q=${searchTerm}&select=id,firstName,lastName,image`.
      const response = await fetch(`https://dummyjson.com/users/search?q=${searchTerm}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const usersData: UserData[] = data.users.map((user: APIResponseType) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
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

  const debouncedFetchUsers = useCallback(
    debounce((searchTerm: string) => handleSearchUsers(searchTerm), 800),
    []
  );

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setUsers([]);
      return;
    }

    if (searchTerm) {
      debouncedFetchUsers(searchTerm);
    }
  }, [debouncedFetchUsers, searchTerm]);

  const handleSelectedUser = (user: UserData) => {
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUsersSet(new Set([...selectedUsersSet, user.email]));
    setSearchTerm('');
    setUsers([]);
  };

  const handleRemoveSelectedUser = (user: UserData) => {
    const updatedSelectedUsers = selectedUsers.filter(selectedUser => selectedUser.email !== user.email);
    setSelectedUsers(updatedSelectedUsers);

    const updatedEmails = new Set(selectedUsersSet);
    updatedEmails.delete(user.email);
    setSelectedUsersSet(updatedEmails);
  };

  return (
    <SearchInput
      options={users}
      setOptions={setUsers}
      selectedOptions={selectedUsers}
      renderSelectedItem={user => {
        return <UserOption user={user} className="selectedUser" />;
      }}
      onRemoveSelectedOption={handleRemoveSelectedUser}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      renderOption={user => {
        return !selectedUsersSet.has(user.email) ? <UserOption user={user} /> : null;
      }}
      onOptionSelected={handleSelectedUser}
    />
  );
};

export default UserSearchWrapper;
