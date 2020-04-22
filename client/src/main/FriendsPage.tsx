import React, { useContext } from 'react';
import './FriendsPage.scss';
import MainPageWrapper from '../generic/MainPageWrapper';
import RestrictedPageWrapper from '../generic/RestrictedPageWrapper';
import UserContext from '../contexts/UserContext';
import TitleHeader from './TitleHeader';
import FriendsList from './FriendsList';

const FriendsPage = () => {
  const userContext = useContext(UserContext);

  return (
    <RestrictedPageWrapper>
      <MainPageWrapper>
        <div className="friends-page">
          <TitleHeader userName={userContext?.user?.name} />
          <div className=""></div>
          <FriendsList />
        </div>
      </MainPageWrapper>
    </RestrictedPageWrapper>
  );
};

export default FriendsPage;
