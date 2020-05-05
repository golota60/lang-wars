import React, { useState } from 'react';
import './FriendsInvitations.scss';
import TextWrapper from './generic/TextWrapper';
import TextInput from './generic/TextInput';
import Button from './generic/Button';

const FriendsInvitations = () => {
  const [inputValue, setInputValue] = useState('');

  function addFriend(e: any) {
    e.preventDefault();
    console.log(inputValue);
  }

  return (
    <div className="friends-invitation-wrapper">
      <TextWrapper className="__title">Invite Friends</TextWrapper>
      <form onSubmit={addFriend} className="add-friend-wrapper">
        <TextInput
          className="add-friend-input"
          onChange={setInputValue}
        ></TextInput>
        <Button className="__add-button">Invite</Button>
      </form>
    </div>
  );
};

export default FriendsInvitations;
