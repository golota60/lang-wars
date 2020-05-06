import React, { useContext } from 'react';
import './DuelStatistics.scss';
import HorizontalLine from './generic/HorizontalLine';
import TextWrapper from './generic/TextWrapper';
import UserContext from '../contexts/UserContext';

const DuelStatistics = () => {
  const userContext = useContext(UserContext);

  return (
    <div className="statistics-container">
      <div className="statistics-container-internal">
        <div className="table-title-container">
          <HorizontalLine />
          <TextWrapper textType="h2" className="table-title__title">
            Statistics
          </TextWrapper>
          <HorizontalLine />
        </div>
        <TextWrapper className="table-title__listing">
          Duels<span>{userContext.user.wins}</span>
        </TextWrapper>
        <br />
        <TextWrapper className="table-title__listing">
          Won<span>{userContext.user.losses}</span>
        </TextWrapper>
        <br />
        <TextWrapper className="table-title__listing">
          Draws <span>{userContext.user.draws}</span>
        </TextWrapper>
        <br />
        <TextWrapper className="table-title__listing">
          Points <span>{userContext.user.points}</span>
        </TextWrapper>
        <br />
      </div>
    </div>
  );
};

export default DuelStatistics;
