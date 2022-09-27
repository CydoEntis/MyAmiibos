import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Button from '../UI/Buttons/Button';

import classes from './MobileNav.module.css';

const MobileNav = ({ toggle }) => {
	const mobileNavClasses = toggle
		? `${classes['mobile-nav']} ${classes['is-active']}`
		: `${classes['mobile-nav']}`;

	return (
		<>
			{toggle && (
				<nav className={mobileNavClasses}>
					<div className={classes['mobile--logo']}>
						<Logo className={classes['logo--large']}/>
					</div>
					<ul>
						<li>
							<NavLink
								className={({ isActive }) =>
									isActive
										? classes.active
										: classes['btn--nav']
								}
								to='/amiibos'
							>
								Amiibos
							</NavLink>
						</li>
						<li>
							<NavLink
								className={({ isActive }) =>
									isActive
										? classes.active
										: classes['btn--nav']
								}
								to='/amiibos/my-collection'
							>
								My Collection
							</NavLink>
						</li>
						<li>
							<Button className={classes['btn--logout']}>
								Logout
							</Button>
						</li>
					</ul>
				</nav>
			)}
		</>
	);
};

export default MobileNav;
