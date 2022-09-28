import React from 'react';

import classes from './FormRow.module.css';

const FormRow = ({ name, type, placeholder, onChange }) => {
	return (
		<div className={classes['form-row']}>
			<input type={type} name={name} onChange={onChange} placeholder={placeholder}/>
		</div>
	);
};

export default FormRow;
