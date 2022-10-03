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
						<h3>Filter: </h3> <Filter />
					</div>
					<div className={classes['form--buttons']}>
						<Button className={classes['form--button']}>
							My Wishlist
						</Button>
						<Button className={classes['form--button']}>
							My Collection
						</Button>
					</div>
				</div>
			</div>
	);
};

export default AmiiboForm;
