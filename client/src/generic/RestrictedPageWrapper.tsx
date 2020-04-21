import React, { useState, useEffect, ReactElement } from 'react';
import './RestrictedPageWrapper.scss';
import LoadingModal from './LoadingModal';
import { Redirect } from 'react-router-dom';
import { verifyToken } from '../utils/fetches';
import { getLangWarsToken } from '../utils/session';

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

  useEffect(() => {
    (async () => {
      const data = await verifyToken(getLangWarsToken());
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
