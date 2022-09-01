import React, { useState } from 'react';

import classes from './Hamburger.module.css';

const Hamburger = ({ toggleMenu, onClick }) => {


	let hamburgerClasses;
	if (toggleMenu) {
		hamburgerClasses = `${classes.hamburger} ${classes['is-active']}`;
	} else {
		hamburgerClasses = `${classes.hamburger}`;
	}

	return (
		<button className={hamburgerClasses} onClick={onClick}>
			<span className={classes.bar}></span>
		</button>
		// <svg
		// 	xmlns='http://www.w3.org/2000/svg'
		// 	fill='currentColor'
		// 	className={hamburgerClasses}
		// 	viewBox='0 0 16 16'
		// >
		// 	<path
		// 		fillRule='evenodd'
		// 		d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
		// 	/>
		// </svg>
	);
};

export default Hamburger;
