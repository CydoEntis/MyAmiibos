import React from 'react'
import logo from "../../assets/images/logo.png"

import classes from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={classes["logo-container"]}>
      <img className={classes["logo-img"]} src={logo} alt="" />
    </div>
  )
}

export default Logo