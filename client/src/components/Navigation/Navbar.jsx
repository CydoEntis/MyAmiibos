import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Hamburger from '../UI/Buttons/Hamburger';
import MobileNav from './MobileNav';
import Button from '../UI/Buttons/Button';

import classes from './Navbar.module.css';
import Logo from '../Logo/Logo';
import { useAppContext } from '../../context/appContext';

const Navbar = () => {
	const [toggleMenu, setToggleMenu] = useState(false);

	const { token, logout } = useAppContext();

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
							<button className={`${classes.tab} ${classes['tab--logout']}`} onClick={logout}>Logout</button>
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
