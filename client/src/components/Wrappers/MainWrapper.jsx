import React from 'react';

import classes from "./MainWrapper.module.css";

const MainWrapper = ({ children }) => {
	return <main className={classes['wrapper--main']}>{children}</main>;
};

export default MainWrapper;
