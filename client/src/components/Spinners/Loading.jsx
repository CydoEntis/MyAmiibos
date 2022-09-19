import React from 'react';
import classes from './Loading.module.css';
const Loading = () => {
	return (
		<div className={classes['loader-wrapper']}>
			<span className={classes.loader}></span>
		</div>
	);
};

export default Loading;
