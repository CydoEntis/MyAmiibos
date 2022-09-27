import React, { useState } from 'react';
import Button from './Button';
import { FaBars, FaTimes } from 'react-icons/fa';

import classes from './Hamburger.module.css';

const Hamburger = ({ toggleMenu, onClick }) => {
	let hamburgerClasses;
	if (toggleMenu) {
		hamburgerClasses = `${classes['nav--close']} ${classes['is-active']}`;
	} else {
		hamburgerClasses = `${classes['nav--open']}`;
	}

	return (
		<>
			{toggleMenu && (
				<Button className={hamburgerClasses} onClick={onClick}>
					<FaTimes />
				</Button>
			)}
			{!toggleMenu && (
				<Button className={hamburgerClasses} onClick={onClick}>
					<FaBars />
				</Button>
			)}
		</>
		// <button className={hamburgerClasses} onClick={onClick}>
		// 	<span className={classes.bar}></span>
		// </button>
	);
};

export default Hamburger;
