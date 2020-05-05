import React, { ReactNode, useContext } from 'react';
import './MainPageWrapper.scss';
import topRight from '../../assets/main-top-right-swirl.svg';
import bottomLeft from '../../assets/main-bottom-left-swirl.svg';
import Button from './Button';
import { Link } from 'react-router-dom';
import { deleteLangWarsToken } from '../../utils/session';
import UserContext from '../../contexts/UserContext';
import { UserDataInterface } from '../../utils/fetches';

interface MainPageWrapperProps {
  children: ReactNode;
}

const MainPageWrapper = ({ children }: MainPageWrapperProps) => {
  const userContext = useContext(UserContext);

  function logoutUser() {
    deleteLangWarsToken();
    userContext.setUser({} as UserDataInterface);
  }

  return (
    <>
      <Link to="/login">
        <Button className="logout-button" outline onClick={logoutUser}>
          Logout
        </Button>
      </Link>
      <img className="swirl-top-right" src={topRight}></img>
      <img className="swirl-bottom-left" src={bottomLeft}></img>
      {children}
    </>
  );
};

export default MainPageWrapper;
