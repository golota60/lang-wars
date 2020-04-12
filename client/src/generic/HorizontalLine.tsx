/* 
This Component is created to standarize the behaviour of horizontal line,
because <hr /> may work differently based on the type of display container it is in
This Component will always render a horizontal line, regardless of the container it is in
*/

import React from 'react';
import './HorizontalLine.scss';

interface HorizontalLineProps {
  className?: string;
}

const HorizontalLine = ({ className }: HorizontalLineProps) => {
  function createClassName() {
    const newClassName: Array<string> = [];
    className && newClassName.push(className);
    return newClassName.join(' ');
  }

  return (
    <>
      <span className={`horizontal-line ${createClassName()}`}></span>
    </>
  );
};

export default HorizontalLine;
