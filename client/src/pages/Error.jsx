import React from 'react';
import { Link } from 'react-router-dom';
import NotFound from '../assets/images/notfound.png';

import classes from './Error.module.css';

const Error = () => {
	return (
		<div className={classes['not-found']}>
			<img src={NotFound} alt='mario question mark block' />
			<div className={classes['not-found--message']}>
				<h3>Uh Oh! Page Not Found!</h3>
				<p>We can't seem to find the page you're looking for.</p>
				<Link className={classes['btn--back']} to='/'>
					back home
				</Link>
			</div>
		</div>
	);
};

export default Error;
