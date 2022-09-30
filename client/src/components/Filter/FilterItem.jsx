import React from 'react';

import classes from './FilterItem.module.css';

const FilterItem = ({ text, onClick }) => {
	return (
		<div className={classes['filter--item']} onClick={onClick}>
			{text}
		</div>
	);
};

export default FilterItem;
