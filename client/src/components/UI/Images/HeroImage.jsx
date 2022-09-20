import React from 'react'


import AmiiboImage from '../../../assets/images/amiibos.png';
import classes from "./HeroImage.module.css";

const HeroImage = () => {
  return (
    <div className={classes['wrapper--image']}>
      <img src={AmiiboImage} alt="Amiibo lin up" />
    </div>
  )
}

export default HeroImage