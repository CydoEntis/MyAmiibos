import React from 'react';
import Button from '../../../UI/Buttons/Button';
import { Link } from 'react-router-dom';

import classes from './DetailControls.module.css';
import { useAppContext } from '../../../../context/appContext';

const DetailControls = () => {
	const { hideAmiiboDetails } = useAppContext();

	return (
		<div className={classes.controls}>
			<Button className={classes['btn--add']}>
				Add To My Collection
			</Button>
			<Link className={classes.link} to='/collection' onClick={hideAmiiboDetails}>
				View My Collection
			</Link>
			<Button className={classes['btn--add']}>Add To My Wishlist</Button>
			<Link className={classes.link} to='/wishlist' onClick={hideAmiiboDetails}>
				View My Wishlist
			</Link>
		</div>
	);
};

export default DetailControls;
