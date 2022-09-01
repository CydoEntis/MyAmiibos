import React from 'react';

import classes from "./MobileNav.module.css";

const MobileNav = ({ toggle }) => {
	const mobileNavClasses = toggle
		? `${classes['mobile-nav']} ${classes['is-active']}`
		: `${classes['mobile-nav']}`;

	return (
		<div className={mobileNavClasses}>
			<h1>Mobile Menu</h1>
		</div>
	);
};

export default MobileNav;
