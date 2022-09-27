import React from 'react';

import classes from './DetailText.module.css';

const DetailText = ({ category, text }) => {
	return (
		<div className={classes.detail}>
			<h5 className={classes.category}>{category}:</h5>
			<h4 className={classes.text}>{text}</h4>
		</div>
	);
};

export default DetailText;
