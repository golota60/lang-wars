import React, { useContext } from 'react';
import './FriendsPage.scss';
import MainPageWrapper from '../generic/MainPageWrapper';
import RestrictedPageWrapper from '../generic/RestrictedPageWrapper';
import TitleHeader from '../TitleHeader';
import UserContext from '../../contexts/UserContext';
import FriendsToDuelList from '../FriendsToDuelList';
import FriendsInvitations from '../FriendsInvitations';

const FriendsPage = () => {
  const userContext = useContext(UserContext);

  return (
    <RestrictedPageWrapper>
      <MainPageWrapper>
        <div className="friends-page">
          <TitleHeader userName={userContext?.user?.name} />
          <div className=""></div>
          <FriendsToDuelList userContext={userContext} />
          <FriendsInvitations userContext={userContext} />
        </div>
      </MainPageWrapper>
    </RestrictedPageWrapper>
  );
};

export default FriendsPage;
