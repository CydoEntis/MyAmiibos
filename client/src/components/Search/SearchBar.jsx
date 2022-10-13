import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useAppContext } from '../../context/appContext';
import Button from '../UI/Buttons/Button';

import classes from './SearchBar.module.css';

const SearchBar = () => {
	const { fetchAmiibos, findAmiibo, searchAmiibos} = useAppContext();
	const [searchValue, setSearchValue] = useState('');

	const handleChange = (e) => {
		setSearchValue(e.target.value);
	};

	// const getAmiibo = async (value) => {
	// 	if (value === '') {
	// 		await getAmiibos("all");
	// 	} else {
	// 		await fetchAmiibos(searchValue);
	// 	}
	// };

	const handleSubmit = (e) => {
		e.preventDefault();
		searchAmiibos(searchValue);
		// getAmiibo(searchValue);
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
