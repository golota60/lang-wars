import React, { useState } from 'react';
import './FriendsInvitations.scss';
import TextWrapper from './generic/TextWrapper';
import TextInput from './generic/TextInput';
import Button from './generic/Button';
import {
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  getUser,
} from '../utils/fetches';
import { getLangWarsToken } from '../utils/session';
import checkmark from '../assets/checkmark-outline.svg';
import exit from '../assets/close-outline.svg';
import { UserContextInterface } from '../contexts/UserContext';

interface FriendsInvitationsInterface {
  userContext: UserContextInterface;
}

const FriendsInvitations = ({ userContext }: FriendsInvitationsInterface) => {
  const [inputValue, setInputValue] = useState('');

  async function handleAddFriendForm(e: any) {
    e.preventDefault();
    await sendFriendRequest(getLangWarsToken(), inputValue);
    const updatedUser = await (await getUser(getLangWarsToken())).json();
    userContext.setUser(updatedUser);
  }

  async function handleCheckmarkClick(friendToAcceptName: string) {
    await acceptFriendRequest(getLangWarsToken(), friendToAcceptName);
    const updatedUser = await (await getUser(getLangWarsToken())).json();
    userContext.setUser(updatedUser);
  }

  async function handleExitClick(friendToDeclineName: string) {
    await declineFriendRequest(getLangWarsToken(), friendToDeclineName);
    const updatedUser = await (await getUser(getLangWarsToken())).json();
    userContext.setUser(updatedUser);
  }

  return (
    <div className="friends-invitation-wrapper">
      <TextWrapper className="__title">Invite Friends</TextWrapper>
      <form onSubmit={handleAddFriendForm} className="add-friend-wrapper">
        <TextInput
          className="add-friend-input"
          onChange={setInputValue}
        ></TextInput>
        <Button className="__add-button">Invite</Button>
      </form>
      <div className="__list">
        {userContext.user.receivedInvitations.map(invitation => {
          return (
            <span className="__listing" key={invitation._id}>
              <TextWrapper>{invitation.name}</TextWrapper>
              <span>
                <img
                  src={checkmark}
                  onClick={() => handleCheckmarkClick(invitation.name)}
                  className="__icon"
                ></img>
                <img
                  src={exit}
                  onClick={() => handleExitClick(invitation.name)}
                  className="__icon"
                ></img>
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default FriendsInvitations;
