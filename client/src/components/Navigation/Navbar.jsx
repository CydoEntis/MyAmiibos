import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Hamburger from '../UI/Buttons/Hamburger';
import MobileNav from './MobileNav';

import classes from './Navbar.module.css';
import Logo from '../Logo/Logo';
import { useAppContext } from '../../context/appContext';

const Navbar = () => {
	const [toggleMenu, setToggleMenu] = useState(false);

	const { token } = useAppContext();

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
								<NavLink
									to='/collection'
									className={({ isActive }) =>
										isActive ? classes.active : classes.tab
									}
								>
									My Collection
								</NavLink>
								<NavLink
									to='/wishlist'
									className={({ isActive }) =>
										isActive ? classes.active : classes.tab
									}
								>
									My Wishlist
								</NavLink>
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
