import React, { useEffect, useState } from 'react';
import './HomePage.scss';
import { getFromStorage, deleteFromStorage } from '../utils/session';
import { verifyToken } from '../utils/fetches';
import { Redirect } from 'react-router-dom';
import MainPageWrapper from '../generic/MainPageWrapper';
import swords from '../assets/SwordsNewColors.svg';
import HorizontalLine from '../generic/HorizontalLine';
import TextWrapper from '../generic/TextWrapper';
import Button from '../generic/Button';
import LoadingModal from '../generic/LoadingModal';

enum StatusEnum {
  DEFAULT = 'DEFAULT',
  AUTHORIZED = 'AUTHORIZED',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

const HomePage = () => {
  const [status, setStatus] = useState(StatusEnum.DEFAULT);

  useEffect(() => {
    const token = getFromStorage('lang-wars-token');
    (async () => {
      const data = await verifyToken(token);
      data.status === 200
        ? setStatus(StatusEnum.AUTHORIZED)
        : setStatus(StatusEnum.UNAUTHORIZED);
    })();
  }, []);

  function logoutUser() {
    deleteFromStorage('lang-wars-token');
    setStatus(StatusEnum.UNAUTHORIZED);
  }

  switch (status) {
    case StatusEnum.DEFAULT:
      return <LoadingModal isShown={true}></LoadingModal>;
    case StatusEnum.UNAUTHORIZED:
      return <Redirect to="/login"></Redirect>;
    case StatusEnum.AUTHORIZED:
      return (
        <MainPageWrapper>
          <Button className="logout-button" outline onClick={logoutUser}>
            Logout
          </Button>
          <div className="home-page">
            <div className="title-container">
              <div className="logo-container">
                <HorizontalLine />
                <img className="swords" src={swords}></img>
                <HorizontalLine />
              </div>
              <TextWrapper textType="h1">Hello {'{INSERT_NAME}'}!</TextWrapper>
              <div className="button-container">
                <Button>Random Duel</Button>
                <Button>Friends</Button>
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
      );
  }
};

export default HomePage;
