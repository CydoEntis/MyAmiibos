import React from 'react';

import classes from './DropdownItem.module.css';

const DropdownItem = ({ text, onClick }) => {
	return (
		<div className={classes['dropdown--item']} onClick={onClick}>
			{text}
		</div>
	);
};

export default DropdownItem;
