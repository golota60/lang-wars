import React, { useState, useEffect, ReactElement, useContext } from 'react';
import './RestrictedPageWrapper.scss';
import LoadingModal from './LoadingModal';
import { Redirect } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import { verifyToken, getUser } from '../../utils/fetches';
import { getLangWarsToken } from '../../utils/session';

enum StatusEnum {
  DEFAULT = 'DEFAULT',
  AUTHORIZED = 'AUTHORIZED',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

interface RestrictedPageWrapperProps {
  children: ReactElement;
}

const RestrictedPageWrapper = ({ children }: RestrictedPageWrapperProps) => {
  const [status, setStatus] = useState(StatusEnum.DEFAULT);
  const userContext = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const data = await verifyToken(getLangWarsToken());
      if (Object.keys(userContext.user).length === 0) {
        const user = await (await getUser(getLangWarsToken())).json();
        userContext.setUser(user);
      }
      data.status === 200
        ? setStatus(StatusEnum.AUTHORIZED)
        : setStatus(StatusEnum.UNAUTHORIZED);
    })();
  }, []);
  switch (status) {
    case StatusEnum.DEFAULT:
      return <LoadingModal isShown={true}></LoadingModal>;
    case StatusEnum.UNAUTHORIZED:
      return <Redirect to="/login"></Redirect>;
    case StatusEnum.AUTHORIZED:
      return children;
  }
};

export default RestrictedPageWrapper;
