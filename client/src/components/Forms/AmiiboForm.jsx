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

const collectionData = [
	{
		id: 1,
		type: 'all',
		isActive: true,
		text: 'All Amiibos',
	},
	{
		id: 2,
		type: 'collected',
		isActive: false,
		text: 'My Collection',
	},
	{
		id: 3,
		type: 'wishlisted',
		isActive: false,
		text: 'My Wishlist',
	},
];

const AmiiboForm = () => {
	const { sortAmiibos, setCollection, collectionData, sortData} = useAppContext();

	return (
		<div className={classes['form--container']}>
			<div className={`${classes['form--row']}`}>
				<h3>Collection: </h3>
				{collectionData.map((collection, index) => (
					<Button
						key={collection.id}
						className={`${
							collection.isActive
								? classes['form--button-active']
								: ''
						} ${classes.btn} ${classes['form--button']}`}
						onClick={() => {
							setCollection(collection.type, index);
						}}
					>
						{collection.text}
					</Button>
				))}
			</div>
			<SearchBar />
			<div className={classes.form}>
				<div className={classes['form--filter']}>
					<div className={classes['form--row']}>
						<h3>Filter: </h3>
						<Filter />
					</div>
					<div className={`${classes['form--row']} ${classes.sort}`}>
						<h3>Sort By: </h3>
						{sortData.map((data, index) => (
							<Button
								key={data.id}
								className={`${
									data.isActive
										? classes['form--button-active']
										: ''
								} ${classes['form--button']}`}
								onClick={() => sortAmiibos(data.sortType, index)}
							>
								{data.name}
							</Button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AmiiboForm;
