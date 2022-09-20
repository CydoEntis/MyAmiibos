import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import Button from '../UI/Buttons/Button';
import SearchBar from './SearchBar';

import classes from './SearchContainer.module.css';

const SearchContainer = () => {
	const { fetchAmiibos } = useAppContext();
	const [searchParams, setSearchParams] = useSearchParams();

	const getAmiibo = async (value) => {
		if(value === '') {
			console.log(value);
			await fetchAmiibos({type: 'all'})
		} else {
			await fetchAmiibos({type: 'search', charName: value})
		}

	}

	const getAllAmiibos = async () => {
		await fetchAmiibos({ type: 'all' });
	};

	const getAllFigures = async () => {
		await fetchAmiibos({ type: 'figure' });
	};

	const getAllCards = async () => {
		await fetchAmiibos({ type: 'card' });
	};

	const getAllYarn = async () => {
		await fetchAmiibos({ type: 'yarn' });
	};
	return (
		<div>
			<SearchBar className={`${classes.btn} ${classes['btn--search']}`} getAmiibo={getAmiibo}/>
			<div className={classes['filter-options']}>
				<Button
					className={`${classes.btn} ${classes['btn--all']}`}
					onClick={getAllAmiibos}
				>
					All
				</Button>
				<Button
					className={`${classes.btn} ${classes['btn--figures']}`}
					onClick={getAllFigures}
				>
					Figures
				</Button>
				<Button
					className={`${classes.btn} ${classes['btn--cards']}`}
					onClick={getAllCards}
				>
					Cards
				</Button>
				<Button
					className={`${classes.btn} ${classes['btn--yarn']}`}
					onClick={getAllYarn}
				>
					Yarn
				</Button>
			</div>
		</div>
	);
};

export default SearchContainer;
