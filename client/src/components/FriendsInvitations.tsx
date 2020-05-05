import React, { useState, useContext } from 'react';
import './FriendsInvitations.scss';
import TextWrapper from './generic/TextWrapper';
import TextInput from './generic/TextInput';
import Button from './generic/Button';
import { sendFriendRequest } from '../utils/fetches';
import UserContext from '../contexts/UserContext';
import { getLangWarsToken } from '../utils/session';

const FriendsInvitations = () => {
  const [inputValue, setInputValue] = useState('');

  async function handleAddFriendForm(e: any) {
    e.preventDefault();
    console.log(inputValue);
    await sendFriendRequest(getLangWarsToken(), inputValue);
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
      {}
    </div>
  );
};

export default FriendsInvitations;
