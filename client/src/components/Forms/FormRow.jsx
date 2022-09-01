import React from 'react';

import classes from './FormRow.module.css';

const FormRow = ({ name, type, labelText, onChange }) => {
	return (
		<div className={classes['form-row']}>
			<label htmlFor={name}>{labelText}</label>
			<input type={type} name={name} onChange={onChange} />
		</div>
	);
};

export default FormRow;
