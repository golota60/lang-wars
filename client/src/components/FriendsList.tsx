import React, { useContext } from 'react';
import './FriendsList.scss';
import UserContext from '../contexts/UserContext';
import HorizontalLine from './generic/HorizontalLine';
import TextWrapper from './generic/TextWrapper';

const FriendsList = () => {
  const userContext = useContext(UserContext);

  return (
    <div className="friends-list">
      <div className="logo-container">
        <HorizontalLine />
        <TextWrapper className="title-text" textType="h3">
          Your Friends
        </TextWrapper>
        <HorizontalLine />
      </div>
      <div className="listings-container">
        {userContext?.user?.friends?.map((obj, key) => {
          return (
            <div className="__listing" key={key}>
              <TextWrapper>{obj.name}</TextWrapper>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FriendsList;
