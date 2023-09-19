import React from 'react';
import Image from 'next/future/image';
import classes from '../../styles/Hero.module.css';

interface HeroProps {
  children: React.ReactNode;
  imgLink: string;
  altText: string;
  imgHash: string;
}

function Hero({ imgLink, children, altText, imgHash }: HeroProps) {
  return (
    <div className={classes.container}>
      <div className={classes.innercontainer}>
        <div className={classes.heroText}>{children}</div>
        <div className={classes.image}>
          <Image src={imgLink} alt={altText} placeholder="blur" blurDataURL={imgHash} fill priority />
        </div>
      </div>
    </div>
  );
}

export default Hero;
