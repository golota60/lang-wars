import React from 'react';
import { UserDataInterface } from '../utils/fetches';

export interface UserContextInterface {
  user: UserDataInterface;
  setUser: (newUser: UserDataInterface) => void;
}

const UserContext = React.createContext({} as UserContextInterface);

export default UserContext;
