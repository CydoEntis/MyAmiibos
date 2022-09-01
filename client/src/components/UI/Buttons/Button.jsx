import React from 'react';

import classes from './Button.module.css';

const Button = ({ children, className, type, onClick }) => {
	const btnClasses = `${className} ${classes.button}`;

	return (
		<button className={btnClasses} type={type} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
