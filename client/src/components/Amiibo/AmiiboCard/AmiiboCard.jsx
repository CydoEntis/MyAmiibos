import React from 'react';
import classes from './AmiiboCard.module.css';
import { useAppContext } from '../../../context/appContext';

const AmiiboCard = ({ amiibo, index }) => {
	const { getSelectedAmiibo, showAmiiboDetails } = useAppContext();
	const handleClick = () => {
		let amiiboId = amiibo.amiiboId;
		getSelectedAmiibo(amiiboId);
		showAmiiboDetails();
	};

	return (
		<button className={classes.card} onClick={handleClick}> 
			<header className={classes['card--header']}>
				<h3 className={classes['amiibo--name']}>{amiibo.name}</h3>
			</header>
			<section className={classes['card--body']}>
				<div className={classes['image-container']}>
					<img src={amiibo.image} alt={amiibo.name} />
				</div>
			</section>
			<footer className={classes['card--footer']}>
				<p className={classes['amiibo--series']}>{amiibo.gameSeries}</p>
				<p className={classes['amiibo--release']}>Released: {amiibo.release || "N/A"}</p>
			</footer>
		</button>
	);
};

export default AmiiboCard;
