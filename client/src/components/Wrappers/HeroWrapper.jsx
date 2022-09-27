import React from 'react';
import { Link } from "react-router-dom";
import Button from '../UI/Buttons/Button';
import HeroImage from '../UI/Images/HeroImage';

import classes from './HeroWrapper.module.css';

import Logo from '../Logo/Logo';
import Mario from '../../assets/images/mario.png';
import Luigi from '../../assets/images/luigi.png';
import Yoshi from '../../assets/images/yoshi.png';
import AmiiboCard from '../Amiibo/AmiiboCard/AmiiboCard';

const amiibos = [
	{
		id: 1,
		image: Mario,
		name: 'Mario',
		amiiboSeries: 'Super Mario',
		release: {
			na: '2014-11-21',
		},
    collected: false
	},
	{
		id: 2,
		image: Luigi,
		name: 'Luigi',
		amiiboSeries: 'Super Mario',
		release: {
			na: '2014-12-14',
		},
    collected: true,
	},
	{
		id: 3,
		image: Yoshi,
		name: 'Yoshi',
		amiiboSeries: 'Super Mario',
		release: {
			na: '2014-11-21',
		},
    collected: true
	},
];

const HeroWrapper = () => {
	return (
		<section className={classes['hero--wrapper']}>
			<div className={classes['hero--text']}>
				<Logo />
				<h3>
					Keep track of all current and upcoming Amiibo's you collect!
				</h3>
				<Link to="/">
					<Button className={classes['hero--btn']}>
						Start Collecting
					</Button>
				</Link>
			</div>
			<HeroImage />
			<div className={classes['amiibos']}>
				{amiibos.map((amiibo) => (
					<AmiiboCard key={amiibo.id} amiibo={amiibo} />
				))}
			</div>
		</section>
	);
};

export default HeroWrapper;
