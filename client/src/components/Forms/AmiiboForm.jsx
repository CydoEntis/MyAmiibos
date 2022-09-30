import React from 'react'
import SearchBar from '../Search/SearchBar';
import Filter  from '../Filter/Filter';
import classes from "./AmiiboForm.module.css";

const AmiiboForm = () => {
  return (
    <div className={classes['form--container']}>
    <SearchBar />
    <div className={classes.form}>
      <h3>Filter: </h3> <Filter />
    </div>
  </div>
  )
}

export default AmiiboForm