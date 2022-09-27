import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from "./Tab.module.css";

const Tab = ({path, text}) => {
  return (
    <NavLink to={path} >{text}</NavLink>
  )
}

export default Tab