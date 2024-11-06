import type { GetStaticProps } from "next";
import React from "react";
import axios from "axios";
import Layout from "../components/layout/Layout";
import styles from "../styles/Home.module.css";
import HeroWide from "../components/sections/HeroWide";
import AboutMe from "../components/sections/AboutMe";
import Testimonial from "../components/sections/Testimonial";
import {
  AboutMeSection,
  AccomplishSummarySection,
  HomeHero,
  Testimonials,
  VoteCall2ActionSection,
  MessageBannerSection,
} from "../interfaces/ContentDataProps";
import { ContentfulEntries } from "../interfaces/ContentfulEntries";
import AccomplishSummary from "../components/sections/AccomplishSummary";
import VoteCall2Action from "../components/sections/VoteCall2Action";
// import FeatureImage from "../components/sections/FeatureImage";
import encodeImg2hash from "../utils/encodeImg2hash";
import MessageBanner from "../components/sections/MessageBanner";

type Props = {
  aboutMe: AboutMeSection[];
  homeHero: HomeHero[];
  accomplishSum: AccomplishSummarySection;
  testimonial: Testimonials[];
  voteCall2Action: VoteCall2ActionSection;
  messageBanner: MessageBannerSection;
};

const Home = ({
  aboutMe,
  homeHero,
  accomplishSum,
  voteCall2Action,
  testimonial,
  messageBanner,
}: Props) => {
  const heroImg = homeHero[0].image;
  const heroText = homeHero[0].fields;

  const navBios = aboutMe.map((bio) => ({
    href: `/bios/${bio.fields.idTag}`,
    display: bio.fields.title,
  }));

  return (
    <Layout navBios={navBios}>
      <div className={styles.container}>
        <main className={styles.main}>
          <MessageBanner
            title={messageBanner.title}
            body={messageBanner.body}
          />
          <HeroWide
            imgLink={`https:${heroImg.url}`}
            altText={heroImg.title}
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
          <Testimonial
            quote={testimonial[0].fields.testimonial}
            author={testimonial[0].fields.author}
            image={testimonial[0].image}
          />

          {/* <FeatureImage
            imgLink={`https:${featureImage.url}`}
            altText={featureImage.title}
          />
          <FeatureImage
            imgLink={`https:${featureImage2.url}`}
            altText={featureImage2.title}
          /> */}
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
    `https://cdn.contentful.com/spaces/nc2tb1hvkxx7/entries?access_token=${process.env.CONTENTFUL_TOKEN}&content_type=testimonial`,
  );
  const testData = testominal.data;

  const accomplishSum = await axios(
    `https://cdn.contentful.com/spaces/nc2tb1hvkxx7/entries/1bnp0BEmJkhX9QZHIpwkoQ?access_token=${process.env.CONTENTFUL_TOKEN}`,
  );
  const voteCall2Action = await axios(
    `https://cdn.contentful.com/spaces/nc2tb1hvkxx7/entries/4UKuYK2It9JIefwCqBzszC?access_token=${process.env.CONTENTFUL_TOKEN}`,
  );

  const messageBanner = await axios(
    `https://cdn.contentful.com/spaces/nc2tb1hvkxx7/entries/6Etokm0x4cJQUJ8J7mhdyh?access_token=${process.env.CONTENTFUL_TOKEN}`,
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

  type FieldName = "aboutMeImage" | "heroimage" | "image";

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

  const testimonData = await getDataNImages(testData, "image");

  aboutMeData = aboutMeData.sort(
    (a, b) => a.fields.displayOrder - b.fields.displayOrder,
  );

  return {
    props: {
      aboutMe: aboutMeData,
      homeHero: heroData,
      testimonial: testimonData,
      featureImage,
      featureImage2,
      accomplishSum: accomplishSum.data.fields,
      voteCall2Action: voteCall2Action.data.fields,
      messageBanner: messageBanner.data.fields,
    },
  };
};
