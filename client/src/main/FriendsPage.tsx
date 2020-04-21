import React from 'react';
import './FriendsPage.scss';
import MainPageWrapper from '../generic/MainPageWrapper';
import RestrictedPageWrapper from '../generic/RestrictedPageWrapper';

const FriendsPage = () => {
  return (
    <RestrictedPageWrapper>
      <MainPageWrapper>
        <div className="friends-page">koks</div>
      </MainPageWrapper>
    </RestrictedPageWrapper>
  );
};

export default FriendsPage;
