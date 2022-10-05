import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Hamburger from '../UI/Buttons/Hamburger';
import MobileNav from './MobileNav';
import Button from '../UI/Buttons/Button';

import classes from './Navbar.module.css';
import Logo from '../Logo/Logo';
import { useAppContext } from '../../context/appContext';

const tabData = [
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

const Navbar = () => {
	const [toggleMenu, setToggleMenu] = useState(false);

	const { token, sortAmiibos } = useAppContext();

	const [tabs, setTabs] = useState(tabData);

	const handleClick = (type, index) => {
		const updatedTabs = tabs.map((tab, tabIndex) => {
			if (tabIndex === index) tab.isActive = true;
			else tab.isActive = false;

			return tab;
		});

		setTabs(updatedTabs);
		sortAmiibos(type);
	};

	const toggleMenuHandler = () => {
		setToggleMenu((prevState) => !prevState);
	};

	return (
		<nav className={classes['nav--main']}>
			<ul className={classes['nav--list']}>
				<Logo onClick={toggleMenu} className={classes['nav--logo']} />
				<div className={classes['nav--options']}>
					{!toggleMenu && <Hamburger onClick={toggleMenuHandler} />}
					<MobileNav
						toggleMenu={toggleMenuHandler}
						toggle={toggleMenu}
					/>
					<div className={classes['nav--desktop']}>
						{token && (
							<>
								<NavLink
									to='/amiibos'
									className={({ isActive }) =>
										isActive ? classes.active : classes.tab
									}
								>
									Amiibos
								</NavLink>
								{tabs.map((tab, index) => (
									<Button
										key={tab.id}
										className={`${
											tab.isActive
												? classes['active--tab']
												: ''
										} ${classes.tab}`}
										onClick={() => {
											handleClick(tab.type, index);
										}}
									>
										{tab.text}
									</Button>
								))}
							</>
						)}
						{!token && (
							<>
								<NavLink
									to='/auth'
									className={({ isActive }) =>
										isActive ? classes.active : classes.tab
									}
								>
									Login/Signup
								</NavLink>
							</>
						)}
					</div>
				</div>
			</ul>
		</nav>
	);
};

export default Navbar;
