import React from 'react';
import { useState } from 'react';
import Button from '../UI/Buttons/Button';
import Card from '../UI/Cards/Card';
import FormRow from './FormRow';

import classes from './AuthForm.module.css';
import Logo from '../Logo/Logo';

const initialState = {
	username: '',
	email: '',
	password: '',
	isMember: true,
};

const AuthForm = () => {
	const [values, setValues] = useState(initialState);

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
		console.log(values);
	};

	const btnText = values.isMember ? 'Login' : 'Sign Up';

	const loginClasses = `${classes.btn} ${classes['btn-login']}`;
	const registerClasses = `${classes.btn} ${classes['btn-register']}`;

	return (
		<Card className={classes['auth-card']}>
		<Logo />
			<form onSubmit={submitHandler}>
				<FormRow
					name='email'
					type='email'
					labelText='Email'
					onChange={onChangeHandler}
				/>
				{!values.isMember && (
					<FormRow
						name='username'
						type='text'
						labelText='Username'
						onChange={onChangeHandler}
					/>
				)}
				<FormRow
					name='password'
					type='password'
					labelText='Password'
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
				<Button className={classes['btn-alt']} onClick={toggleMember}>
					{values.isMember ? 'Create an Account' : 'Login'}
				</Button>
			</div>
		</Card>
	);
};

export default AuthForm;
