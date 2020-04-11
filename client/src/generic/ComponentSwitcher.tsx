import React from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import './ComponentSwitcher.scss';

interface ComponentSwitcherProps {
  changeKey: boolean;
  children: any;
}

const ComponentSwitcher = ({ changeKey, children }: ComponentSwitcherProps) => {
  return (
    <>
      <SwitchTransition mode="out-in">
        <CSSTransition
          timeout={300}
          classNames="medium-transitions"
          key={changeKey ? 'true' : 'false'}
        >
          <div>{children}</div>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
};

export default ComponentSwitcher;
