import React from 'react';
import Card from '../UI/Card';
import FormRow from './FormRow';

import classes from './FormRow.module.css';

const AuthForm = () => {
	const onChangeHandler = (e) => {
		console.log(e.target.value);
	};

	return (
		<Card>
			<form>
				<FormRow
					name='email'
					type='email'
          labelText="Email"
					onChange={onChangeHandler}
				/>
				<FormRow
					name='password'
					type='text'
          labelText="Password"
					onChange={onChangeHandler}
				/>

				<button className="auth-btn">Login</button>
        <p style={{textAlign: "center"}}>Don't have an account?</p>
				<button className="auth-btn-alt">Create a Account</button>
			</form>
		</Card>
	);
};

export default AuthForm;
