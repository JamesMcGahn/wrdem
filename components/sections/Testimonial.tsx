import React from "react";
import Image from "next/image";
import Markdown from "markdown-to-jsx";
import Card from "react-bootstrap/Card";
import classes from "../../styles/Testimonial.module.css";
import { ImageProps } from "../../interfaces/ContentDataProps";

interface TestimonialProps {
  quote: string;
  author: string;
  image: ImageProps;
}

function Testimonial({ quote, author, image }: TestimonialProps) {
  return (
    <div className={classes.container}>
      <div className={classes.innercontainer}>
        <Card className={classes.card}>
          <div className={classes.cardImgCont}>
            <div className={classes.cardImg}>
              <Image
                width={170}
                height={250}
                src={`https:${image.url}`}
                quality="100"
                alt={`${image.title}`}
                priority
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAYAAABLLYUHAAAAEklEQVR42mNsbKyrZ4ACRuI4APBQCAGXe98ZAAAAAElFTkSuQmCC"
                sizes="100%"
              />
            </div>
          </div>
          <div className={classes.quoteblock}>
            <p className={classes.quoteSym}>“</p>
            <div className={classes.quote}>
              <Markdown options={{ wrapper: React.Fragment }}>{quote}</Markdown>
            </div>
            <p className={classes.quoteSym}>”</p>
            <p className={classes.author}>- {author}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Testimonial;
