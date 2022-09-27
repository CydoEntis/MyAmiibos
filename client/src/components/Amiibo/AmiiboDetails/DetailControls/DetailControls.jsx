import React from 'react';
import Button from '../../../UI/Buttons/Button';
import { Link } from 'react-router-dom';

import classes from './DetailControls.module.css';

const DetailControls = () => {
	return (
		<div className={classes.controls}>
			<Button className={classes['btn--add']}>
				Add To My Collection
			</Button>
			<Link className={classes.link} to='/collection'>
				View My Collection
			</Link>
			<Button className={classes['btn--add']}>Add To My Wishlist</Button>
			<Link className={classes.link} to='/wishlist'>
				View My Wishlist
			</Link>
		</div>
	);
};

export default DetailControls;
