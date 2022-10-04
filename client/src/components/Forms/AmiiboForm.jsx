import React from 'react';
import SearchBar from '../Search/SearchBar';
import Filter from '../Filter/Filter';
import Button from '../UI/Buttons/Button';

import classes from './AmiiboForm.module.css';
import { useAppContext } from '../../context/appContext';
import { useState } from 'react';

const sortData = [
	{
		id: 1,
		name: 'Id',
		isActive: true,
		sortType: 'default',
	},
	{
		id: 2,
		name: 'A-Z',
		isActive: false,
		sortType: 'a-z',
	},
	{
		id: 3,
		name: 'Series',
		isActive: false,
		sortType: 'series',
	},
	{
		id: 4,
		name: 'Date',
		isActive: false,
		sortType: 'date',
	},
];

const AmiiboForm = () => {
	const { sortAmiibos } = useAppContext();
	const [sortControls, setSortControls] = useState(sortData);

	const handleSort = (sortType, index) => {
		const updatedControls = sortControls.map((control, controlIndex) => {
			if (controlIndex === index) control.isActive = true;
			else control.isActive = false;

			return control;
		});

		setSortControls(updatedControls);
		sortAmiibos(sortType);
	};

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
						<h3>Sort By: </h3>
						{sortControls.map((data, index) => (
							<Button
								key={data.id}
								className={`${
									data.isActive
										? classes['form--button-active']
										: ''
								} ${classes['form--button']}`}
								onClick={() => handleSort(data.sortType, index)}
							>
								{data.name}
							</Button>
						))}
					</div>
				</div>
				{/* <div className={`${classes['form--row']} ${classes.pages}`}>
					<h3>Cards Per Page: </h3>
					<Button className={classes['form--button']}>25</Button>
					<Button className={classes['form--button']}>50</Button>
					<Button className={classes['form--button']}>100</Button>
				</div> */}
			</div>
		</div>
	);
};

export default AmiiboForm;
