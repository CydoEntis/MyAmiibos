import React from 'react'
import { Link } from 'react-router-dom'
import classes from "./Logo.module.css";

const Logo = ({className, toggleMenu}) => {
  const logoClasses = `${className} ${classes.logo}`;
  return (
      <Link onClick={toggleMenu} to="/" className={logoClasses}>Amiibo<span>Party</span></Link>
  )
}

export default Logo