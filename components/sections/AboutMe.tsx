import React from "react";
import Image from "next/future/image";
import Card from "react-bootstrap/Card";
import Markdown from "markdown-to-jsx";
import classes from "../../styles/AboutMe.module.css";

import { AboutMeSection } from "../../interfaces/ContentDataProps";

interface AboutMeProps {
  reverse?: boolean;
  data: AboutMeSection;
  backgroundColored?: string;
}

function AboutMe({ reverse = false, data, backgroundColored }: AboutMeProps) {
  const { fields, image } = data;

  const { title, aboutMeText } = fields;

  const imageCont = (
    <div className={classes.cardImg}>
      <Image
        fill
        src={`https:${image.url}`}
        quality="100"
        alt={image.title}
        priority
        placeholder="blur"
        blurDataURL={`https:${image.url}?w=100&q=5`}
        sizes="100%"
      />
    </div>
  );
  const textCont = (
    <div className={classes.cardText}>
      <h2>{title}</h2>
      <Markdown options={{ wrapper: React.Fragment }}>{aboutMeText}</Markdown>
    </div>
  );

  return (
    <div
      className={classes.container}
      style={backgroundColored ? { backgroundColor: backgroundColored } : {}}
    >
      <div className={reverse ? classes.innerReverse : classes.innerContainer}>
        <Card
          className={
            reverse ? `${classes.box} ${classes.overlayReverse}` : classes.box
          }
        >
          {reverse ? textCont : imageCont}
        </Card>
        <Card
          className={
            reverse ? classes.box : `${classes.box} ${classes.overlay}`
          }
        >
          {reverse ? imageCont : textCont}
        </Card>
      </div>
    </div>
  );
}

export default AboutMe;
