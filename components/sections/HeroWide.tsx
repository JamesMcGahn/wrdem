import React from "react";
import Image from "next/image";
import classes from "../../styles/HeroWide.module.css";

interface HeroProps {
  title: string;
  subtitle: string;
  imgLink: string;
  altText: string;
}

function HeroWide({ imgLink, title, subtitle, altText }: HeroProps) {
  const titleSplit = title.split(/(Re-Elect|Elect|VOTE)/).filter(Boolean);

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
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAYAAAA7KqwyAAAAF0lEQVR42mNsbKyrZ6AAMI4aMGoAEAAAsNISAVLcKWsAAAAASUVORK5CYII="
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
