import React from 'react';
import SearchBar from '../Search/SearchBar';
import Filter from '../Filter/Filter';
import Button from '../UI/Buttons/Button';

import classes from './AmiiboForm.module.css';

const AmiiboForm = () => {
	return (
		<div className={classes['form--container']}>
			<SearchBar />
			<div className={classes.form}>
				<div className={classes['form--filter']}>
					<div className={classes['form--row']}>
						<h3>Filter: </h3>
						<Filter />
					</div>
					<div className={`${classes['form--row']} ${classes.sort}`}>
						<h3>Sort: </h3>
						<Button className={classes['form--button']}>A-Z</Button>
						<Button className={classes['form--button']}>
							Series
						</Button>
						<Button className={classes['form--button']}>
							Date
						</Button>
					</div>
				</div>
				<div className={`${classes['form--row']} ${classes.pages}`}>
					<h3>Cards Per Page: </h3>
					<Button className={classes['form--button']}>25</Button>
					<Button className={classes['form--button']}>50</Button>
					<Button className={classes['form--button']}>100</Button>
				</div>
			</div>
		</div>
	);
};

export default AmiiboForm;
