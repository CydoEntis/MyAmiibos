import React from 'react'
import { Link } from "react-router-dom"
import Hamburger from '../UI/Buttons/Hamburger'

import classes from "./Navbar.module.css"

const Navbar = () => {
  return (
    <nav>
      <ul>
        {/* <li>
          <Link to="/login" >Login</Link>
        </li>
        <li>
          <Link to="/logout" >Logout</Link>
        </li> */}
        <Hamburger />
      </ul>
    </nav>
  )
}

export default Navbar