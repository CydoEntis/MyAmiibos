import React from 'react';
import Button from '../UI/Buttons/Button';
import Dropdown from '../UI/Dropdown/Dropdown';

import classes from './FilterOptions.module.css';

const FilterOptions = () => {

	return (
		<Dropdown></Dropdown>
		// <div>
		// 	<div className={classes['filter-options']}>
		// 		<Button
		// 			className={`${classes.btn} ${classes['btn--all']}`}
		// 			onClick={getAllAmiibos}
		// 		>
		// 			All
		// 		</Button>
		// 		<Button
		// 			className={`${classes.btn} ${classes['btn--figures']}`}
		// 			onClick={getAllFigures}
		// 		>
		// 			Figures
		// 		</Button>
		// 		<Button
		// 			className={`${classes.btn} ${classes['btn--cards']}`}
		// 			onClick={getAllCards}
		// 		>
		// 			Cards
		// 		</Button>
		// 		<Button
		// 			className={`${classes.btn} ${classes['btn--yarn']}`}
		// 			onClick={getAllYarn}
		// 		>
		// 			Yarn
		// 		</Button>
		// 	</div>
		// </div>
	);
};

export default FilterOptions;
