import React from 'react';
import FormRow from '../Forms/FormRow';
import Button from '../UI/Buttons/Button';
import SearchWrapper from '../Wrappers/SearchWrapper';
import classes from './SearchBar.module.css';

const SearchBar = ({ onChange, value, className }) => {
	const handleChange = (e) => {

	};

  const handleSubmit = (e) => {
    e.preventDefault();
  }

	return (
		<SearchWrapper>
			<form className={classes.search} onSubmit={handleSubmit}>
				<FormRow
					name='search'
					type='text'
					labelText='Find An Amiibo'
          value={value}
					onChange={handleChange}
				/>
				<Button type='submit' className={className}>
					Search
				</Button>
			</form>
		</SearchWrapper>
	);
};

export default SearchBar;
