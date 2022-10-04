import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import Logo from '../Logo/Logo';
import Button from '../UI/Buttons/Button';

import classes from './MobileNav.module.css';

const buttonData = [
	{
		id: 1,
		type: 'all',
		isActive: true,
		text: 'All Amiibos',
	},
	{
		id: 2,
		type: 'collection',
		isActive: false,
		text: 'My Collection',
	},
	{
		id: 3,
		type: 'wishlist',
		isActive: false,
		text: 'My Wishlist',
	},
];

const MobileNav = ({ toggle, toggleMenu }) => {
	const { user, logout, sortAmiibos } = useAppContext();

	const [buttons, setButtons] = useState(buttonData);

	const handleClick = (type, index) => {
		const updatedButtons = buttons.map((button, buttonIndex) => {
			if (buttonIndex === index) button.isActive = true;
			else button.isActive = false;

			return button;
		});

		setButtons(updatedButtons);
		sortAmiibos(type);
		toggleMenu();
	};

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
							{buttons.map((button, index) => (
								<li key={button.id}>
									<Button
										className={`${
											button.isActive
												? classes['btn--action-active']
												: ''
										} ${classes.btn} ${
											classes['btn--action']
										}`}
										onClick={() => {
											handleClick(button.type, index);
										}}
									>
										{button.text}
									</Button>
								</li>
							))}
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
