import React from 'react';
import './DuelStatistics.scss';
import HorizontalLine from '../generic/HorizontalLine';
import TextWrapper from '../generic/TextWrapper';

const DuelStatistics = () => {
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
          Duels<span>{`{NUMBER_OF_DUELS}`}</span>
        </TextWrapper>
        <br />
        <TextWrapper className="table-title__listing">
          Won<span>{`{NUMBER_OF_WINS}`}</span>
        </TextWrapper>
        <br />
        <TextWrapper className="table-title__listing">
          Points <span>{`{NUMBER_OF_POINTS}`}</span>
        </TextWrapper>
        <br />
      </div>
    </div>
  );
};

export default DuelStatistics;
