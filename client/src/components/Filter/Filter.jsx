import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useAppContext } from '../../context/appContext';

import classes from './Filter.module.css';
import DropdownList from './FilterOptions';

const Filter = () => {
	const { filterIsOpen, toggleFilter, filterType } =
		useAppContext();

	const toggleDropdown = () => {
		toggleFilter(!filterIsOpen);
	};

	return (
		<>
			<div className={classes.filter} onClick={toggleDropdown}>
				<div className={classes['filter--text']}>{filterType}</div>
				<div className={classes['filter--icon']}>
					<FaChevronDown />
				</div>
			</div>
			{filterIsOpen && <DropdownList />}
		</>
	);
};

export default Filter;
