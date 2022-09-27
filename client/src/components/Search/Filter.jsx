import React from 'react';

import classes from './Filter.module.css';
import SearchBar from './SearchBar';
import Dropdown from '../UI/Dropdown/Dropdown';

const Filter = () => {
	return (
		<div className={classes['filter--container']}>
			<SearchBar />
			<div className={classes.filter}>
				<h3>Filter: </h3> <Dropdown />
			</div>
		</div>
	);
};

export default Filter;
