import React, { useState, useEffect } from 'react';
import './HomePage.scss';
import { UserDataInterface, getUser } from '../utils/fetches';
import { Link } from 'react-router-dom';
import MainPageWrapper from '../generic/MainPageWrapper';
import swords from '../assets/SwordsNewColors.svg';
import HorizontalLine from '../generic/HorizontalLine';
import TextWrapper from '../generic/TextWrapper';
import Button from '../generic/Button';
import RestrictedPageWrapper from '../generic/RestrictedPageWrapper';
import { getLangWarsToken } from '../utils/session';

const HomePage = () => {
  const [user, setUser] = useState<UserDataInterface>({} as UserDataInterface);

  useEffect(() => {
    async () => {
      const userData = await getUser(getLangWarsToken());
      setUser(await userData.json());
    };
  }, []);

  return (
    <RestrictedPageWrapper>
      <MainPageWrapper>
        <div className="home-page">
          <div className="title-container">
            <div className="logo-container">
              <HorizontalLine />
              <img className="swords" src={swords}></img>
              <HorizontalLine />
            </div>
            <TextWrapper textType="h1">Hello {user?.name}!</TextWrapper>
            <div className="button-container">
              <Link to="/duel">
                <Button>Random Duel</Button>
              </Link>
              <Link to="/friends">
                <Button>Friends</Button>
              </Link>
            </div>
          </div>

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

          <div className="challenges-container"></div>
          <div className="duels-container"></div>
        </div>
      </MainPageWrapper>
    </RestrictedPageWrapper>
  );
};

export default HomePage;
