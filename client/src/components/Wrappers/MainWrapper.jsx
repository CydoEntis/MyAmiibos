import React from 'react';
import { useAppContext } from '../../context/appContext';

import classes from './MainWrapper.module.css';

const MainWrapper = ({ children, className }) => {
	const computedClasses = `${classes['wrapper--main']} ${className}`;
	return <main className={computedClasses} >{children}</main>;
};

export default MainWrapper;