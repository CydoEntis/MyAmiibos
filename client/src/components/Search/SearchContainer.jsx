import React from 'react';
import Button from '../UI/Buttons/Button';
import SearchBar from './SearchBar';

import classes from './SearchContainer.module.css';

const SearchContainer = () => {
	return (
		<div>
			<SearchBar className={`${classes.btn} ${classes['btn--search']}`} />
			<div className={classes['filter-options']}>
				<Button className={`${classes.btn} ${classes['btn--all']}`}>
					All
				</Button>
				<Button className={`${classes.btn} ${classes['btn--figures']}`}>
					Figures
				</Button>
				<Button className={`${classes.btn} ${classes['btn--cards']}`}>
					Cards
				</Button>
				<Button className={`${classes.btn} ${classes['btn--yarn']}`}>
					Yarn
				</Button>
			</div>
		</div>
	);
};

export default SearchContainer;
