import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import Logo from '../Logo/Logo';
import Button from '../UI/Buttons/Button';

import classes from './MobileNav.module.css';

const MobileNav = ({ toggle, toggleMenu }) => {
	const { user, logout, sortAmiibos } = useAppContext();


	const handleLogout = () => {
		logout();
		toggleMenu();
	};

	const mobileNavClasses = toggle
		? `${classes['mobile-nav']} ${classes['is-active']}`
		: `${classes['mobile-nav']}`;

	return (
		<>
			<nav className={mobileNavClasses}>
				<Button className={classes['nav--close']} onClick={toggleMenu}>
					<FaTimes />
				</Button>
				<div className={classes['mobile--logo']}>
					<Logo
						toggleMenu={toggleMenu}
						className={classes['logo--large']}
					/>
				</div>
				<ul>
					{user && (
						<>
							<li>
								<NavLink
									className={({ isActive }) =>
										isActive
											? classes.active
											: classes['btn--nav']
									}
									to='/amiibos'
									onClick={toggleMenu}
								>
									Amiibos
								</NavLink>
							</li>
							<li>
								<Button
									className={classes['btn--logout']}
									onClick={handleLogout}
								>
									Logout
								</Button>
							</li>
						</>
					)}
					{!user && (
						<li>
							<NavLink
								className={({ isActive }) =>
									isActive
										? classes.active
										: classes['btn--nav']
								}
								to='/auth'
								onClick={toggleMenu}
							>
								Login/Signup
							</NavLink>
						</li>
					)}
				</ul>
			</nav>
		</>
	);
};

export default MobileNav;
