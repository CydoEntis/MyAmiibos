import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hamburger from '../UI/Buttons/Hamburger';

import classes from './Navbar.module.css';
import Logo from '../Logo/Logo';

const Navbar = () => {
	const [toggleMenu, setToggleMenu] = useState(false);

	const toggleMenuHandler = () => {
		setToggleMenu((prevState) => !prevState);
	};

	const mobileNavClasses = toggleMenu
		? `${classes['mobile-nav']} ${classes['is-active']}`
		: `${classes['mobile-nav']}`;

	return (
		<nav>
			<ul>
				<Logo className={classes['nav-logo']} />
				<div>
					<Hamburger
						toggleMenu={toggleMenu}
						onClick={toggleMenuHandler}
					/>
					{toggleMenu && (
						<div className={mobileNavClasses}>
							<h1>Mobile Menu</h1>
						</div>
					)}
				</div>
			</ul>
		</nav>
	);
};

export default Navbar;
