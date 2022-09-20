import React from 'react';
import Navbar from '../components/Navigation/Navbar';
import MainWrapper from '../components/Wrappers/MainWrapper';
import Footer from '../components/Footer/Footer';

import classes from './Dashboard.module.css';
import HeroWrapper from '../components/Wrappers/HeroWrapper';

const Dashboard = () => {
	return (
		<>
			<Navbar />
			<MainWrapper className={classes.dashboard}>
				<HeroWrapper />
			</MainWrapper>
			<Footer />
		</>
	);
};

export default Dashboard;
