import type { GetStaticProps } from "next";
import React from "react";
import Head from "next/head";
import Markdown from "markdown-to-jsx";
import axios from "axios";
import Layout from "../components/layout/Layout";
import styles from "../styles/Home.module.css";
import Hero from "../components/sections/Hero";
import AboutMe from "../components/sections/AboutMe";
import {
  AboutMeSection,
  HomeHero,
  ImageProps,
} from "../interfaces/ContentDataProps";
import { ItemFields, ContentfulEntries } from "../interfaces/ContentfulEntries";
import Testominal from "../components/sections/Testimonial";
import FeatureImage from "../components/sections/FeatureImage";
import encodeImg2hash from "../utils/encodeImg2hash";

type Props = {
  aboutMe: AboutMeSection[];
  homeHero: HomeHero[];
  testimonial: ItemFields;
  featureImage: ImageProps;
};

const Home = ({ aboutMe, homeHero, testimonial, featureImage }: Props) => {
  const heroImg = homeHero[0].image;
  const heroText = homeHero[0].fields;

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <meta name="robots" content="all" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Wood-Ridge Dems</title>
          <meta name="description" content="Wood-Ridge Democrats" />
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.wrdems.com/" />
          <meta property="og:title" content="Wood-Ridge Democrats" />
          <meta property="og:description" content="Elect The Sarlo Team" />
          <meta
            property="og:image"
            content="https://www.wrdems.com/static/imgs/sarloteam.jpeg"
          />
        </Head>
        <main className={styles.main}>
          <Hero
            imgLink={`https:${heroImg.url}`}
            altText={heroImg.title}
            imgHash={heroImg.encoded}
          >
            <Markdown options={{ wrapper: React.Fragment }}>
              {heroText.heroText}
            </Markdown>
          </Hero>

          {aboutMe.map((bio, i) => (
            <div
              id={bio.fields.idTag}
              className={styles.container}
              key={bio.fields.idTag}
            >
              {i % 2 === 0 ? (
                <AboutMe data={bio} reverse backgroundColored="#0576bc" />
              ) : (
                <AboutMe data={bio} />
              )}
            </div>
          ))}

          <FeatureImage
            imgLink={`https:${featureImage.url}`}
            altText={featureImage.title}
            imgHash={featureImage.encoded}
          />
          <Testominal
            author={testimonial.author}
            quote={testimonial.testimonial}
          />
        </main>
      </div>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios(
    `https://cdn.contentful.com/spaces/nc2tb1hvkxx7/entries?access_token=${process.env.CONTENTFUL_TOKEN}&content_type=aboutMe`,
  );
  const { data } = res;

  const hero = await axios(
    `https://cdn.contentful.com/spaces/nc2tb1hvkxx7/entries?access_token=${process.env.CONTENTFUL_TOKEN}&content_type=homehero`,
  );
  const heros = hero.data;

  const testominal = await axios(
    `https://cdn.contentful.com/spaces/nc2tb1hvkxx7/entries/2cqEfvEhTOLklRw3cFRZ0h?access_token=${process.env.CONTENTFUL_TOKEN}`,
  );

  const featureImageData = await axios(
    `https://cdn.contentful.com/spaces/nc2tb1hvkxx7/assets/21BVaK2SMNL68GLjsdNYyY?access_token=${process.env.CONTENTFUL_TOKEN}`,
  );
  const fiFields = featureImageData.data.fields;

  const featureImage = {
    url: fiFields.file.url,
    title: fiFields.title,
    encoded: await encodeImg2hash(`https:${fiFields.file.url}`),
  };

  type FieldName = "aboutMeImage" | "heroimage";

  async function getDataNImages(
    contData: ContentfulEntries,
    fieldname: FieldName,
  ) {
    return Promise.all(
      contData.items.map(async (item) => {
        const imageId = item.fields[fieldname].sys.id;
        const imageInfo = contData.includes.Asset.find(
          (img) => img.sys.id === imageId,
        );
        const imageURL = imageInfo?.fields.file.url;

        const encodedImg = await encodeImg2hash(`https:${imageURL}`);
        const { fields } = item;

        const image = {
          url: imageURL || "",
          title: imageInfo?.fields.title || "",
          encoded: encodedImg,
        };

        return { fields, image };
      }),
    );
  }

  let aboutMeData = await getDataNImages(data, "aboutMeImage");

  const heroData = await getDataNImages(heros, "heroimage");

  aboutMeData = aboutMeData.sort((a, b) => {
    if (a.fields.displayOrder === 1 && b.fields.displayOrder !== 1) {
      return -1;
    }
    if (a.fields.displayOrder !== 1 && b.fields.displayOrder === 1) {
      return 1;
    }
    return 0;
  });

  return {
    props: {
      aboutMe: aboutMeData,
      homeHero: heroData,
      testimonial: testominal.data.fields,
      featureImage,
    },
  };
};
