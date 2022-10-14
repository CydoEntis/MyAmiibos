import React from 'react'

import Silhouette from "../../assets/images/silhouette.png";

import classes from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={classes['not-found']}>
      <img className={classes['not-found--image']}src={Silhouette} alt="" />
      <h3 className={classes['not-found--text']}>No Amiibos Found</h3>
    </div>
  )
}

export default NotFound