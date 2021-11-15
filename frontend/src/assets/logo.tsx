import React, { ImgHTMLAttributes } from 'react';
import logo from './svg/logo.svg';

export const Logo: React.FC<ImgHTMLAttributes<Element>> = (props) => <img {...props} src={logo} alt="logo" />;
