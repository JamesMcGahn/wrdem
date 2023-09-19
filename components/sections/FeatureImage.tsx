import React from 'react';
import Image from 'next/future/image';
import classes from '../../styles/FeatureImage.module.css';

interface FeatureImageProps {
  imgLink: string;
  altText: string;
  imgHash: string;
}

function FeatureImage({ imgLink, altText, imgHash }: FeatureImageProps) {
  return (
    <div className={classes.container}>
      <div className={classes.innercontainer}>
        <div className={classes.image}>
          <Image src={imgLink} alt={altText} fill placeholder="blur" blurDataURL={imgHash} />
        </div>
      </div>
    </div>
  );
}

export default FeatureImage;
