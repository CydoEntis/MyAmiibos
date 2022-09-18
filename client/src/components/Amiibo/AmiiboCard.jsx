import React from 'react';
import classes from './AmiiboCard.module.css';
import { FaHeart } from "react-icons/fa";


const AmiiboCard = ({ amiibo, index }) => {
	return (
		<div className={classes.card}>
			<header className={classes['card--header']}>
				<h3 className={classes['amiibo--name']}>{amiibo.name}</h3>
				<FaHeart className={classes['card--icon']} />
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
		</div>
	);
};

export default AmiiboCard;