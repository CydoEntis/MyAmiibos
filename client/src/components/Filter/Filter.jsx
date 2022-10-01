import React from 'react';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

import classes from './Filter.module.css';
import DropdownList from './FilterOptions';

const Filter = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [filter, setFilter] = useState("All");

	const toggleFilter = () => {
		setIsOpen((prevState) => !prevState);
	};
	return (
		<>
			<div className={classes.filter} onClick={toggleFilter}>
				<div className={classes['filter--text']}>{filter}</div>
				<div className={classes['filter--icon']}>
					<FaChevronDown />
				</div>
			</div>
			{isOpen && <DropdownList setIsOpen={setIsOpen} setFilter={setFilter}/>}
		</>
	);
};

export default Filter;
