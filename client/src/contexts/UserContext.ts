import React from 'react';
import { UserDataInterface } from '../utils/fetches';

interface UserContextInterface {
  user: UserDataInterface;
  setUser: (newUser: UserDataInterface) => void;
}

const UserContext = React.createContext({} as UserContextInterface);

export default UserContext;
