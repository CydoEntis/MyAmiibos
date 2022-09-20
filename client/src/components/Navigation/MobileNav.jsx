import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';

import classes from './MobileNav.module.css';

const MobileNav = ({ toggle }) => {
	const mobileNavClasses = toggle
		? `${classes['mobile-nav']} ${classes['is-active']}`
		: `${classes['mobile-nav']}`;

	return (
		<nav className={mobileNavClasses}>
			{toggle && (
				<ul>
					<Logo />
					<li>
						<NavLink
							className={({ isActive }) =>
								isActive ? classes.active : ''
							}
							to='/amiibos'
						>
							Amiibos
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) =>
								isActive ? classes.active : ''
							}
							to='/amiibos/my-collection'
						>
							My Collection
						</NavLink>
					</li>
					<button className={classes['btn--logout']}>Logout</button>
				</ul>
			)}
		</nav>
	);
};

export default MobileNav;
