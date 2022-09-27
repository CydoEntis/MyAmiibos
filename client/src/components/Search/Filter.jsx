import React from 'react'

import classes from "./Filter.module.css";
import SearchBar from './SearchBar';
import FilterOptions from './FilterOptions';

const Filter = () => {
  return (
    <div className={classes['filter--container']}>
      <SearchBar />
      <FilterOptions />
    </div>
  )
}

export default Filter