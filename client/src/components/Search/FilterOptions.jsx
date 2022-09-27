import React from 'react';
import { useAppContext } from '../../context/appContext';
import Button from '../UI/Buttons/Button';

import classes from './FilterOptions.module.css';

const FilterOptions = () => {
	const { fetchAmiibos } = useAppContext();

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

export default FilterOptions;
