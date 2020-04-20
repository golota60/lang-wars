import React, { ReactNode } from 'react';
import './MainPageWrapper.scss';
import topRight from '../assets/main-top-right-swirl.svg';
import bottomLeft from '../assets/main-bottom-left-swirl.svg';
import Button from './Button';
import { deleteLangWarsToken } from '../utils/session';
import { Link } from 'react-router-dom';

interface MainPageWrapperProps {
  children: ReactNode;
}

const MainPageWrapper = ({ children }: MainPageWrapperProps) => {
  function logoutUser() {
    deleteLangWarsToken();
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
