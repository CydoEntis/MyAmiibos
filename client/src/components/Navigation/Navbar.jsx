import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Hamburger from '../UI/Buttons/Hamburger';
import MobileNav from './MobileNav';
import Tab from '../UI/Tabs/Tab';

import classes from './Navbar.module.css';
import Logo from '../Logo/Logo';

const Navbar = () => {
	const [toggleMenu, setToggleMenu] = useState(false);

	const toggleMenuHandler = () => {
		setToggleMenu((prevState) => !prevState);
	};

	return (
		<nav className={classes['nav--main']}>
			<ul className={classes['nav--list']}>
				<Logo className={classes['nav--logo']} />
				<div className={classes['nav--options']}>
					{!toggleMenu && <Hamburger onClick={toggleMenuHandler} />}
					<MobileNav
						onClick={toggleMenuHandler}
						toggle={toggleMenu}
					/>
					<div className={classes['nav--desktop']}>
						<NavLink
							to='/amiibos'
							className={({ isActive }) =>
								isActive ? classes.active : classes.tab
							}
						>
							Amiibos
						</NavLink>
						<NavLink
							to='/amiibos/collection'
							className={({ isActive }) =>
								isActive ? classes.active : classes.tab
							}
						>
							My Collection
						</NavLink>
						<NavLink
							to='/amiibos/wishlist'
							className={({ isActive }) =>
								isActive ? classes.active : classes.tab
							}
						>
							My Wishlist
						</NavLink>
					</div>
				</div>
			</ul>
		</nav>
	);
};

export default Navbar;
