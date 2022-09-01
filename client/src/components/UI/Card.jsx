import React from 'react'

import classes from "./Card.module.css";

const Card = ({className, children}) => {
  const cardClasses = `${classes.card} ${className}`

  return (
    <div className={cardClasses}>{children}</div>
  )
}

export default Card