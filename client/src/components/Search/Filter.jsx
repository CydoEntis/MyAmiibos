import React from 'react'

import classes from "./Filter.module.css";
import SearchContainer from './SearchContainer';

const Filter = () => {
  return (
    <div className={classes['filter--container']}>
      <SearchContainer/>
    </div>
  )
}

export default Filter