import React from 'react';
import SearchBar from '../Search/SearchBar';
import Filter from '../Filter/Filter';
import Button from '../UI/Buttons/Button';

import classes from './AmiiboForm.module.css';
import { useAppContext } from '../../context/appContext';

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
