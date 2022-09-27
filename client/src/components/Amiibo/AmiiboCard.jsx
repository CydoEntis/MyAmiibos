import React from 'react';
import classes from './AmiiboCard.module.css';
import { FaCheck, FaMinus } from 'react-icons/fa';
import { useAppContext } from '../../context/appContext';

const AmiiboCard = ({ amiibo, index }) => {
	const { getSelectedAmiibo, showAmiiboDetails } = useAppContext();
	const handleClick = () => {
		getSelectedAmiibo(amiibo);
		showAmiiboDetails();
	}

	return (
		<button className={classes.card} onClick={handleClick}>
			<header className={classes['card--header']}>
				<h3 className={classes['amiibo--name']}>{amiibo.name}</h3>
				<span className={classes['card--icon']}>
					<FaCheck
						className={`${
							amiibo.collected
								? classes['card--icon-collected']
								: ''
						}`}
					/>
				</span>
			</header>
			<section className={classes['card--body']}>
				<div className={classes['image-container']}>
					<img src={amiibo.image} alt={amiibo.name} />
				</div>
				<p className={classes['amiibo--series']}>
					{amiibo.amiiboSeries}
				</p>
			</section>
			<div className={classes['card--footer']}>
				<p className={classes['amiibo--date-release']}>
					Available: {amiibo.release.na}
				</p>
			</div>
		</button>
	);
};

export default AmiiboCard;
