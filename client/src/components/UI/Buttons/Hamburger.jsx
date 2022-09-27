import React, { useState } from 'react';
import Button from './Button';
import { FaBars, FaTimes } from 'react-icons/fa';

import classes from './Hamburger.module.css';

const Hamburger = ({ onClick }) => {
	return (
		<>
			<Button className={classes['nav--open']} onClick={onClick}>
				<FaBars />
			</Button>
		</>
	);
};

export default Hamburger;
