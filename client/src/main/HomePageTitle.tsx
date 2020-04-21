import React, { ReactElement } from 'react';
import HorizontalLine from '../generic/HorizontalLine';
import TextWrapper from '../generic/TextWrapper';
import swords from '../assets/SwordsNewColors.svg';

interface HomePageTitleProps {
  children?: ReactElement;
  userName: string;
}

const HomePageTitle = ({ children, userName }: HomePageTitleProps) => {
  return (
    <div className="title-container">
      <div className="logo-container">
        <HorizontalLine />
        <img className="swords" src={swords}></img>
        <HorizontalLine />
      </div>
      <TextWrapper textType="h1">Hello {userName}!</TextWrapper>
      {children}
    </div>
  );
};

export default HomePageTitle;
