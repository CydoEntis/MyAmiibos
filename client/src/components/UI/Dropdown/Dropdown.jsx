import React from 'react';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

import classes from './Dropdown.module.css';
import DropdownList from './DropdownList';

const Dropdown = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [filter, setFilter] = useState("All");

	const openDropdown = () => {
		setIsOpen((prevState) => !prevState);
	};
	return (
		<>
			<div className={classes.dropdown} onClick={openDropdown}>
				<div className={classes['dropdown--text']}>{filter}</div>
				<div className={classes['dropdown--icon']}>
					<FaChevronDown />
				</div>
			</div>
			{isOpen && <DropdownList setIsOpen={setIsOpen} setFilter={setFilter}/>}
		</>
	);
};

export default Dropdown;
