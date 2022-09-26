import React from 'react'
import logo from "../../assets/images/logo.png"

import classes from "./Logo.module.css";

const Logo = ({className}) => {
  const logoClasses = `${className} ${classes["logo-container"]}`;
  return (
      <h3 className={classes.logo}>Amiibo<span>Party</span></h3>
  )
}

export default Logo