import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Hamburger from '../UI/Buttons/Hamburger';
import MobileNav from './MobileNav';

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
					<Hamburger
						toggleMenu={toggleMenu}
						onClick={toggleMenuHandler}
					/>
					<MobileNav toggle={toggleMenu} />
					<div className="main-nav">
						<NavLink
							className={({ isActive }) =>
								isActive ? 'active' : ''
							}
							to='/amiibos'
						>
							All Amiibos
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive ? 'active' : ''
							}
							to='/amiibos/collected'
						>
							My Amiibos
						</NavLink>
					</div>
				</div>
			</ul>
		</nav>
	);
};

export default Navbar;
