import type { GetStaticProps, GetStaticPaths } from "next";
import React from "react";
import axios from "axios";
import Layout from "../../../components/layout/Layout";
import styles from "../../../styles/Home.module.css";
import { AboutMeSection } from "../../../interfaces/ContentDataProps";
import { ContentfulEntries } from "../../../interfaces/ContentfulEntries";

// import FeatureImage from "../components/sections/FeatureImage";
import encodeImg2hash from "../../../utils/encodeImg2hash";

type Props = {
  aboutMe: AboutMeSection[];
};

const Home = ({ aboutMe }: Props) => {
  const navBios = aboutMe.map((bio) => ({
    href: bio.fields.idTag,
    display: bio.fields.title,
  }));

  return (
    <Layout navBios={navBios}>
      <div className={styles.container}>
        <main className={styles.main}></main>
      </div>
    </Layout>
  );
};

export default Home;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios(
    `https://cdn.contentful.com/spaces/nc2tb1hvkxx7/entries?access_token=${process.env.CONTENTFUL_TOKEN}&content_type=biopage`,
  );
  const { data } = res;

  const bios = data.items;

  const paths = bios.map((bio) => ({
    params: { slug: bio.fields.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string };

  const res = await axios(
    `https://cdn.contentful.com/spaces/nc2tb1hvkxx7/entries?access_token=${process.env.CONTENTFUL_TOKEN}&content_type=aboutMe`,
  );
  const { data } = res;

  const bioData = await axios(
    `https://cdn.contentful.com/spaces/nc2tb1hvkxx7/entries?access_token=${process.env.CONTENTFUL_TOKEN}&content_type=biopage`,
  );
  const bios = bioData.data;

  type FieldName = "aboutMeImage" | "heroimage" | "image" | "displayImage";

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

  const pageBioData = await getDataNImages(bios, "displayImage");

  let aboutMeData = await getDataNImages(data, "aboutMeImage");

  aboutMeData = aboutMeData.sort(
    (a, b) => a.fields.displayOrder - b.fields.displayOrder,
  );

  const pageBio = pageBioData.filter((bio) => bio.fields.slug === slug);
  console.log(pageBio);

  return {
    props: {
      aboutMe: aboutMeData,
      bio: pageBioData,
    },
  };
};
