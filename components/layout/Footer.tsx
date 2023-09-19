import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import classes from '../../styles/Footer.module.css';

function Footer() {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <div className={classes.container}>
      <div className={classes.innercontainer}>
        <div className={classes.left}>
          <a id={classes.fbLink} href="https://www.facebook.com/WRDems" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faSquareFacebook} />
          </a>
        </div>
        <div className={classes.middle}>
          <p>Paid for by Wood-Ridge Democrats {year}</p>
          <p>&copy;{year} Wood-Ridge Democrats</p>
        </div>
        <div className={classes.right} />
      </div>
    </div>
  );
}

export default Footer;
