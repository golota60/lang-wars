import React, { useEffect, useState } from 'react';
import './HomePage.scss';
import {
  getFromStorage,
  deleteFromStorage,
  getLangWarsToken,
} from '../utils/session';
import { verifyToken, getUser } from '../utils/fetches';
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

interface UserDataInterface {
  _id: string;
  name: string;
  email: string;
}

const HomePage = () => {
  const [status, setStatus] = useState(StatusEnum.DEFAULT);
  const [user, setUser] = useState<UserDataInterface>({
    _id: '',
    name: '',
    email: '',
  });

  useEffect(() => {
    (async () => {
      const data = await verifyToken(getLangWarsToken());
      data.status === 200
        ? setStatus(StatusEnum.AUTHORIZED)
        : setStatus(StatusEnum.UNAUTHORIZED);
    })();
  }, []);

  useEffect(() => {
    if (status === StatusEnum.AUTHORIZED) {
      (async () => {
        const userData = await getUser(getLangWarsToken());
        setUser(await userData.json());
      })();
    }
  }, [status]);

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
              <TextWrapper textType="h1">Hello {user?.name}!</TextWrapper>
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
