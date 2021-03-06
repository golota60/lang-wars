import React, { ReactNode } from 'react';
import './TextWrapper.scss';

interface TextWrapperProps {
  className?: string;
  color?: 'black' | 'light-gray' | 'gray' | 'dark-gray' | 'red' | 'green';
  children: ReactNode;
  textType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  pointer?: boolean;
  onClick?(): void;
}

const TextWrapper = ({
  className,
  color,
  children,
  textType,
  pointer,
  onClick = () => {},
}: TextWrapperProps) => {
  function createFontSize() {
    let fontSize = '1.6rem';
    switch (textType) {
      case 'h1':
        fontSize = '3.2rem';
        break;
      case 'h2':
        fontSize = '2.4rem';
        break;
      case 'h3':
        fontSize = '1.872rem';
        break;
      case 'h4':
        fontSize = '1.6rem';
        break;
      case 'h5':
        fontSize = '1.328rem';
        break;
      case 'h6':
        fontSize = '1.072rem';
        break;
      default:
        break;
    }

    return fontSize;
  }

  function createClassName() {
    const newClassName: Array<string> = [];
    className && newClassName.push(className);
    color ? newClassName.push(color) : newClassName.push('dark-gray');
    pointer && newClassName.push('pointer');
    return newClassName.join(' ');
  }

  return (
    <>
      <span
        className={`${createClassName()} flex-center`}
        style={{ fontSize: createFontSize() }}
        onClick={() => onClick()}
      >
        {children}
      </span>
    </>
  );
};

export default TextWrapper;
