import React, { useContext } from 'react';
import './HomePage.scss';
import { Link } from 'react-router-dom';
import MainPageWrapper from '../generic/MainPageWrapper';
import Button from '../generic/Button';
import RestrictedPageWrapper from '../generic/RestrictedPageWrapper';
import UserContext from '../../contexts/UserContext';
import TitleHeader from '../TitleHeader';
import DuelStatistics from '../DuelStatistics';
import HorizontalLine from '../generic/HorizontalLine';
import TextWrapper from '../generic/TextWrapper';

const HomePage = () => {
  const userContext = useContext(UserContext);

  return (
    <RestrictedPageWrapper>
      <MainPageWrapper>
        <div className="home-page">
          <div className="title-container">
            <TitleHeader userName={userContext?.user?.name} />
            <div className="button-container">
              <Link to="/language">
                <Button>Random Duel</Button>
              </Link>
              <Link to="/friends">
                <Button>Friends</Button>
              </Link>
            </div>
          </div>
          <DuelStatistics />
          <div className="challenges-container">
            <div className="table-title-container">
              <HorizontalLine />
              <TextWrapper textType="h2" className="table-title__title">
                Awaiting Duels
              </TextWrapper>
              <HorizontalLine />
            </div>
            <div className="content">
              {userContext?.user?.awaitingDuels?.map(_user => _user.enemyName)}
            </div>
            <div className="table-title-container">
              <HorizontalLine />
              <TextWrapper textType="h2" className="table-title__title">
                Sent Duels
              </TextWrapper>
              <HorizontalLine />
            </div>
            <div className="content">
              {userContext?.user?.sentDuels?.map(_user => {
                return (
                  <div key={_user.enemyName}>
                    {_user.enemyName} {_user.language}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="duels-container">
            <div className="table-title-container">
              <HorizontalLine />
              <TextWrapper textType="h2" className="table-title__title">
                History
              </TextWrapper>
              <HorizontalLine />
            </div>
            <div className="content">
              {userContext?.user?.matchHistory?.map(_user => _user.enemyName)}
            </div>
          </div>
        </div>
      </MainPageWrapper>
    </RestrictedPageWrapper>
  );
};

export default HomePage;
