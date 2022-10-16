import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navigation/Navbar';
import Footer from '../components/Footer/Footer';

import AmiiboList from '../assets/images/amiibo-list.png';
import Mario from '../assets/images/mario-amiibo.jpg';

import classes from './Dashboard.module.css';
import { useAppContext } from '../context/appContext';

const Dashboard = () => {
	const { user } = useAppContext();
	return (
		<>
			<Navbar />
			<div className={classes.dashboard}>
				<div className={classes['hero-section']}>
					<h3>AmiiboParty is an Amiibo Collection App.</h3>
					<h5>Keep track of your collected and wishlisted Amiibos</h5>
					<Link
						to={user ? '/amiibos' : '/auth'}
						className={classes.btn}
					>
						Start Collecting
					</Link>
					<div className={classes['img-wrapper']}>
						<img
							className={classes['mobile-img']}
							src={Mario}
							alt='mario'
						/>
						<img
							className={classes['desktop-img']}
							src={AmiiboList}
							alt='list of amiibos'
						/>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Dashboard;
