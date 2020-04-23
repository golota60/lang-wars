import React, { useEffect, useContext } from 'react';
import './HomePage.scss';
import { Link } from 'react-router-dom';
import MainPageWrapper from '../generic/MainPageWrapper';
import Button from '../generic/Button';
import RestrictedPageWrapper from '../generic/RestrictedPageWrapper';
import UserContext from '../../contexts/UserContext';
import { getUser } from '../../utils/fetches';
import { getLangWarsToken } from '../../utils/session';
import TitleHeader from '../TitleHeader';
import DuelStatistics from '../DuelStatistics';

const HomePage = () => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const userData = await getUser(getLangWarsToken());
      const userJsonData = await userData.json();
      userContext.setUser(userJsonData);
    })();
  }, []);

  return (
    <RestrictedPageWrapper>
      <MainPageWrapper>
        <div className="home-page">
          <div className="title-container">
            <TitleHeader userName={userContext?.user?.name} />
            <div className="button-container">
              <Link to="/duel">
                <Button>Random Duel</Button>
              </Link>
              <Link to="/friends">
                <Button>Friends</Button>
              </Link>
            </div>
          </div>
          <DuelStatistics />
          <div className="challenges-container"></div>
          <div className="duels-container"></div>
        </div>
      </MainPageWrapper>
    </RestrictedPageWrapper>
  );
};

export default HomePage;
