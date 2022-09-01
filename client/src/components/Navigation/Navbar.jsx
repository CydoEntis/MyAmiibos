import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hamburger from '../UI/Buttons/Hamburger';
import MobileNav from "./MobileNav";

import classes from './Navbar.module.css';
import Logo from '../Logo/Logo';

const Navbar = () => {
	const [toggleMenu, setToggleMenu] = useState(false);

	const toggleMenuHandler = () => {
		setToggleMenu((prevState) => !prevState);
	};

	return (
		<nav>
			<ul>
				<Logo className={classes['nav-logo']} />
				<div>
					<Hamburger
						toggleMenu={toggleMenu}
						onClick={toggleMenuHandler}
					/>
          <MobileNav toggle={toggleMenu} />

				</div>
			</ul>
		</nav>
	);
};

export default Navbar;
