import React from 'react'
import logo from "../../assets/images/logo.png"

import classes from "./Logo.module.css";

const Logo = ({className}) => {
  const logoClasses = `${className} ${classes["logo-container"]}`;
  return (
    <div className={logoClasses}>
      <img className={classes["logo-img"]} src={logo} alt="my amiibos logo" />
    </div>
  )
}

export default Logo