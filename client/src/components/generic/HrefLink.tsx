import React, { ReactNode } from 'react';
import './HrefLink.scss';

interface HrefLinkProps {
  href?: string;
  children: ReactNode;
  onClick?(e: any): void;
  className?: string;
}

const HrefLink = ({ href, children, onClick, className }: HrefLinkProps) => {
  return (
    <>
      <a className={`${className} generic-link`} onClick={onClick} href={href}>
        {children}
      </a>
    </>
  );
};

export default HrefLink;
