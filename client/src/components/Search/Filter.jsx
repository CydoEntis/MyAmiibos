import React from 'react'

import classes from "./Filter.module.css";
import SearchBar from './SearchBar';
import Dropdown from '../UI/Dropdown/Dropdown';

const Filter = () => {
  return (
    <div className={classes['filter--container']}>
      <SearchBar />
      <Dropdown />
    </div>
  )
}

export default Filter