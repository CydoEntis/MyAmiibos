import React from 'react'
import { Link } from 'react-router-dom'
import classes from "./Logo.module.css";

const Logo = ({className}) => {
  const logoClasses = `${className} ${classes.logo}`;
  return (
      <Link to="/amiibos" className={logoClasses}>Amiibo<span>Party</span></Link>
  )
}

export default Logo