import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Buttons/Button';
import Card from '../UI/Cards/Card';
import FormRow from './FormRow';

import classes from './AuthForm.module.css';
import Logo from '../Logo/Logo';
import { useAppContext } from '../../context/appContext.js';
import Alert from '../Alerts/Alert';

const initialState = {
	username: '',
	email: '',
	password: '',
	isMember: true,
};

const AuthForm = () => {
	const { isLoading, showAlert, displayAlert, user, userAuth } =
		useAppContext();
	const [values, setValues] = useState(initialState);
	const navigate = useNavigate();

	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		setValues((prevState) => ({ ...prevState, [name]: value }));
	};

	const toggleMember = () => {
		setValues((prevState) => ({
			...prevState,
			isMember: !prevState.isMember,
		}));
	};

	const submitHandler = (e) => {
		e.preventDefault();
		const { username, email, password, isMember } = values;
		if (!email || !password || (!isMember && !username)) {
			displayAlert();
			return;
		}

		const currentUser = {
			username,
			email,
			password,
		};

		if (values.isMember) {

			console.log(currentUser);

			userAuth({
				currentUser,
				endPoint: 'login',
				alertText: 'Login Successful! Redirecting...',
			});
		} else {
			userAuth({
				currentUser,
				endPoint: 'register',
				alertText: 'User created! Redirecting...',
			});
		}
	};

	useEffect(() => {
		setTimeout(() => {
			if (user) {
				navigate('/');
			}
		}, 3000);
	}, [user, navigate]);

	const btnText = values.isMember ? 'Login' : 'Sign Up';

	const loginClasses = `${classes.btn} ${classes['btn--login']}`;
	const registerClasses = `${classes.btn} ${classes['btn--register']}`;

	return (
		<Card className={classes['auth-card']}>
			<Logo className={classes.logo} />
			<form onSubmit={submitHandler}>
				{showAlert && <Alert />}
				<FormRow
					name='email'
					type='email'
					placeholder='Email'
					onChange={onChangeHandler}
				/>
				{!values.isMember && (
					<FormRow
						name='username'
						type='text'
						placeholder='Username'
						onChange={onChangeHandler}
					/>
				)}
				<FormRow
					name='password'
					type='password'
					placeholder='Password'
					onChange={onChangeHandler}
				/>
				<Button
					className={values.isMember ? loginClasses : registerClasses}
				>
					{btnText}
				</Button>
			</form>
			<div className={classes['form-controls']}>
				<p className='text-centered'>
					{values.isMember
						? "Don't have an account?"
						: 'Already have an Account?'}
				</p>
				<Button className={`${classes.btn} ${classes['btn--alt']}`} onClick={toggleMember}>
					{values.isMember ? 'Create an Account' : 'Login'}
				</Button>
			</div>
		</Card>
	);
};

export default AuthForm;
