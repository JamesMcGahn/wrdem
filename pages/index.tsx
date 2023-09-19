import type { GetStaticProps } from "next";
import React from "react";
import Head from "next/head";
import axios from "axios";
import Layout from "../components/layout/Layout";
import styles from "../styles/Home.module.css";
import HeroWide from "../components/sections/HeroWide";
import AboutMe from "../components/sections/AboutMe";
import {
  AboutMeSection,
  AccomplishSummarySection,
  HomeHero,
  ImageProps,
  VoteCall2ActionSection,
} from "../interfaces/ContentDataProps";
import { ContentfulEntries } from "../interfaces/ContentfulEntries";
import AccomplishSummary from "../components/sections/AccomplishSummary";
import VoteCall2Action from "../components/sections/VoteCall2Action";
import FeatureImage from "../components/sections/FeatureImage";
import encodeImg2hash from "../utils/encodeImg2hash";

type Props = {
  aboutMe: AboutMeSection[];
  homeHero: HomeHero[];
  accomplishSum: AccomplishSummarySection;
  featureImage: ImageProps;
  featureImage2: ImageProps;
  voteCall2Action: VoteCall2ActionSection;
};

const Home = ({
  aboutMe,
  homeHero,
  featureImage,
  featureImage2,
  accomplishSum,
  voteCall2Action,
}: Props) => {
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
          <HeroWide
            imgLink={`https:${heroImg.url}`}
            altText={heroImg.title}
            imgHash={heroImg.encoded}
            title={heroText.title}
            subtitle={heroText.subtitle}
          />
          <AccomplishSummary text={accomplishSum.accomplishlist} />
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
          <FeatureImage
            imgLink={`https:${featureImage2.url}`}
            altText={featureImage2.title}
            imgHash={featureImage2.encoded}
          />
          <VoteCall2Action fields={voteCall2Action} />
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
    `https://cdn.contentful.com/spaces/nc2tb1hvkxx7/entries?access_token=${process.env.CONTENTFUL_TOKEN}&content_type=homeheroWide`,
  );
  const heros = hero.data;

  const testominal = await axios(
    `https://cdn.contentful.com/spaces/nc2tb1hvkxx7/entries/2cqEfvEhTOLklRw3cFRZ0h?access_token=${process.env.CONTENTFUL_TOKEN}`,
  );
  const accomplishSum = await axios(
    `https://cdn.contentful.com/spaces/nc2tb1hvkxx7/entries/1bnp0BEmJkhX9QZHIpwkoQ?access_token=${process.env.CONTENTFUL_TOKEN}`,
  );
  const voteCall2Action = await axios(
    `https://cdn.contentful.com/spaces/nc2tb1hvkxx7/entries/4UKuYK2It9JIefwCqBzszC?access_token=${process.env.CONTENTFUL_TOKEN}`,
  );

  const featureImageData = await axios(
    `https://cdn.contentful.com/spaces/nc2tb1hvkxx7/assets/3HO2b7Ut0FfwZGHkrnsImX?access_token=${process.env.CONTENTFUL_TOKEN}`,
  );
  const featureImageData2 = await axios(
    `https://cdn.contentful.com/spaces/nc2tb1hvkxx7/assets/3mBLFbKmqtQmlHVGOrDCnn?access_token=${process.env.CONTENTFUL_TOKEN}`,
  );
  const fiFields = featureImageData.data.fields;
  const fiFields2 = featureImageData2.data.fields;

  const featureImage = {
    url: fiFields.file.url,
    title: fiFields.title,
    encoded: await encodeImg2hash(`https:${fiFields.file.url}`),
  };

  const featureImage2 = {
    url: fiFields2.file.url,
    title: fiFields2.title,
    encoded: await encodeImg2hash(`https:${fiFields2.file.url}`),
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

  aboutMeData = aboutMeData.sort(
    (a, b) => a.fields.displayOrder - b.fields.displayOrder,
  );

  return {
    props: {
      aboutMe: aboutMeData,
      homeHero: heroData,
      testimonial: testominal.data.fields,
      featureImage,
      featureImage2,
      accomplishSum: accomplishSum.data.fields,
      voteCall2Action: voteCall2Action.data.fields,
    },
  };
};
