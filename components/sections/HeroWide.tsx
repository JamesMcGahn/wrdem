import React from "react";
import Image from "next/future/image";
import classes from "../../styles/HeroWide.module.css";

interface HeroProps {
  title: string;
  subtitle: string;
  imgLink: string;
  altText: string;
  imgHash: string;
}

function HeroWide({ imgLink, title, subtitle, altText, imgHash }: HeroProps) {
  const titleSplit = title.split(/(Re-Elect|Elect)/).filter(Boolean);
  console.log(titleSplit);
  console.log(title);

  return (
    <div className={classes.container}>
      <div className={classes.innercontainer}>
        <div className={classes.topBannerTitle}>
          <h1>
            <span className={classes.electText}>{titleSplit[0]}</span>
            <span className={classes.electTextTeam}>{titleSplit[1]}</span>
          </h1>
        </div>
        <div className={classes.image}>
          <Image
            src={imgLink}
            alt={altText}
            placeholder="blur"
            blurDataURL={imgHash}
            fill
            priority
          />
        </div>
        <div className={classes.bottomBannerTitle}>
          <h2>{subtitle} </h2>
        </div>
      </div>
    </div>
  );
}

export default HeroWide;
