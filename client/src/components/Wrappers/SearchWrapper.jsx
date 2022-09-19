import React from 'react';

import classes from './SearchWrapper.module.css';

const SearchWrapper = ({ children }) => {
	return <main className={classes['wrapper--search']}>{children}</main>;
};

export default SearchWrapper;
