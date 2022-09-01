import React from 'react';
import { Link } from 'react-router-dom';
import Hamburger from '../UI/Buttons/Hamburger';

import classes from './Navbar.module.css';
import Logo from '../Logo/Logo';

const Navbar = () => {
	return (
		<nav>
			<ul>
				<Logo className={classes["nav-logo"]}/>
				<div>
					{/* <li>
          <Link to="/login" >Login</Link>
        </li>
        <li>
          <Link to="/logout" >Logout</Link>
        </li> */}
					<Hamburger />
				</div>
			</ul>
		</nav>
	);
};

export default Navbar;
