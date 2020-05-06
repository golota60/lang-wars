import React from 'react';
import './FriendsToDuelList.scss';
import HorizontalLine from './generic/HorizontalLine';
import TextWrapper from './generic/TextWrapper';
import { UserContextInterface } from '../contexts/UserContext';
import exit from '../assets/close-outline.svg';
import { deleteFriend, getUser } from '../utils/fetches';
import { getLangWarsToken } from '../utils/session';

interface FriendsToDuelListInterface {
  userContext: UserContextInterface;
}

const FriendsToDuelList = ({ userContext }: FriendsToDuelListInterface) => {
  async function handleExitClick(friendToDeleteName: string) {
    await deleteFriend(getLangWarsToken(), friendToDeleteName);
    const updatedUser = await (await getUser(getLangWarsToken())).json();
    userContext.setUser(updatedUser);
  }

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
        {userContext.user.friends.map((_obj, _key) => {
          return (
            <div className="__listing" key={_key}>
              <TextWrapper>{_obj.name}</TextWrapper>
              <span>
                <img
                  src={exit}
                  onClick={() => handleExitClick(_obj.name)}
                  className="__icon"
                ></img>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FriendsToDuelList;
