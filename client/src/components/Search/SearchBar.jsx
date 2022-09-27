import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Button from '../UI/Buttons/Button';

import classes from './SearchBar.module.css';

const SearchBar = ({ getAmiibo, className }) => {
	const [searchValue, setSearchValue] = useState('');

	const handleChange = (e) => {
		setSearchValue(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		getAmiibo(searchValue);
	};
	return (
			<form className={classes.search} onSubmit={handleSubmit}>
				<input
					className={classes.searchbar}
					placeholder='Search for an Amiibo'
					name='search'
					type='text'
					value={searchValue}
					onChange={handleChange}
				/>
				<Button type='submit' className={classes['search--btn']}>
					<FaSearch />
				</Button>
			</form>
	);
};

export default SearchBar;
