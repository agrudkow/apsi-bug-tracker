import React, { ImgHTMLAttributes } from 'react';
import logo from './svg/logo.svg';
import logo_white from './svg/logo_white.svg';

export const Logo: React.FC<ImgHTMLAttributes<Element>> = (props) => <img {...props} src={logo} alt="logo" />;
export const Logo_white: React.FC<ImgHTMLAttributes<Element>> = (props) => <img  {...props} src={logo_white} style={{width: "100%", height: "auto"}} alt="logo_white" />;
