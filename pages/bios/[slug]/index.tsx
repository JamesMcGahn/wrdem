import type { GetStaticProps, GetStaticPaths } from "next";
import React from "react";
import axios from "axios";
import Markdown from "markdown-to-jsx";
import Image from "next/future/image";
import Card from "react-bootstrap/Card";
import Layout from "../../../components/layout/Layout";
import classes from "../../../styles/BioPage.module.css";
import { AboutMeSection, BioPage } from "../../../interfaces/ContentDataProps";
import { ContentfulEntries, Item } from "../../../interfaces/ContentfulEntries";

// import FeatureImage from "../components/sections/FeatureImage";
import encodeImg2hash from "../../../utils/encodeImg2hash";

type Props = {
  aboutMe: AboutMeSection[];
  bioPage: BioPage;
};

const Home = ({ aboutMe, bioPage }: Props) => {
  const navBios = aboutMe.map((bio) => ({
    href: `/bios/${bio.fields.idTag}`,
    display: bio.fields.title,
  }));
  // console.log(bioPage);
  const { title, biotext } = bioPage.fields;
  const { image } = bioPage;

  const imageCont = (
    <div className={classes.cardImg}>
      <Image
        fill
        src={`https:${image.url}`}
        quality="100"
        alt={image.title}
        priority
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAYAAABLLYUHAAAAEklEQVR42mNsbKyrZ4ACRuI4APBQCAGXe98ZAAAAAElFTkSuQmCC"
        sizes="100%"
      />
    </div>
  );

  return (
    <Layout navBios={navBios}>
      <div className={classes.container}>
        <main className={classes.main}>
          <Card className={classes.cardcontainer}>
            <div className={classes.cardText}>
              <h1>{title}</h1>
              <Markdown options={{ wrapper: React.Fragment }}>
                {biotext}
              </Markdown>
              {imageCont}
            </div>
          </Card>
        </main>
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

  const paths = bios.map((bio: Item) => ({
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
      bioPage: pageBio[0],
    },
  };
};
