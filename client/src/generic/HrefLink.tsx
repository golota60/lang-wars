import React from 'react';
import './HrefLink.scss';

interface HrefLinkProps {
  href?: string;
  text: string;
  onClick?(e: any): void;
  className?: string;
}

const HrefLink = ({ href, text, onClick, className }: HrefLinkProps) => {
  return (
    <>
      <a className={`${className} generic-link`} onClick={onClick} href={href}>
        {text}
      </a>
    </>
  );
};

export default HrefLink;
