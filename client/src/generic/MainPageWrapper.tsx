import React, { ReactNode } from 'react';
import './MainPageWrapper.scss';
import topRight from '../assets/main-top-right-swirl.svg';
import bottomLeft from '../assets/main-bottom-left-swirl.svg';

interface MainPageWrapperProps {
  children: ReactNode;
}

const MainPageWrapper = ({ children }: MainPageWrapperProps) => {
  return (
    <>
      <img className="swirl-top-right" src={topRight}></img>
      <img className="swirl-bottom-left" src={bottomLeft}></img>
      {children}
    </>
  );
};

export default MainPageWrapper;
