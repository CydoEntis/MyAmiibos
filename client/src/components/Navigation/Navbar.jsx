import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
					{/* <Link to='/amiibos'>All Amiibos</Link>
					<Link to='/amiibos/collected'>My Amiibos</Link> */}
				</div>
			</ul>
		</nav>
	);
};

export default Navbar;
