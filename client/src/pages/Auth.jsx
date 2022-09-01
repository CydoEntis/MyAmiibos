import React from 'react';
import Footer from '../components/Footer/Footer';
import AuthForm from '../components/Forms/AuthForm';
import Navbar from '../components/Navigation/Navbar';

import classes from "./Auth.module.css"

const Auth = () => {
	return (
		<>
			<Navbar />
			<main className={classes.main}>
				<AuthForm />
			</main>
			<Footer />
		</>
	);
};

export default Auth;
