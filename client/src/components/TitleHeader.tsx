import React from 'react';
import swords from '../assets/SwordsNewColors.svg';
import './TitleHeader.scss';
import HorizontalLine from './generic/HorizontalLine';
import TextWrapper from './generic/TextWrapper';

interface TitleHeaderProps {
  userName: string;
}

const TitleHeader = ({ userName }: TitleHeaderProps) => {
  return (
    <div className="title-header-container">
      <div className="logo-container">
        <HorizontalLine />
        <img className="swords" src={swords}></img>
        <HorizontalLine />
      </div>
      <TextWrapper textType="h1">Hello {userName}!</TextWrapper>
    </div>
  );
};

export default TitleHeader;
