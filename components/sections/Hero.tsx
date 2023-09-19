import React from "react";
import Image from "next/future/image";
import classes from "../../styles/Hero.module.css";

interface HeroProps {
  children: React.ReactNode;
  imgLink: string;
  altText: string;
}

function Hero({ imgLink, children, altText }: HeroProps) {
  return (
    <div className={classes.container}>
      <div className={classes.innercontainer}>
        <div className={classes.heroText}>{children}</div>
        <div className={classes.image}>
          <Image
            src={imgLink}
            alt={altText}
            placeholder="blur"
            blurDataURL={`https:${imgLink}?w=100&q=5`}
            fill
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
