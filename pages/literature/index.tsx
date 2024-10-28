import React from "react";
import type { GetStaticProps } from "next";
import axios from "axios";
import Head from "next/head";
import ImageModal from "../../components/ui/ImageModal";
import Layout from "../../components/layout/Layout";
import styles from "../../styles/Literature.module.css";
import { AboutMeSection } from "../../interfaces/ContentDataProps";
import encodeImg2hash from "../../utils/encodeImg2hash";
import electionBios from "../../public/static/imgs/2024camplit/WR-2024-Election-Bios.jpg";
import electionTeam from "../../public/static/imgs/2024camplit/WR-2024-Election-Team.jpg";
import electionFamily from "../../public/static/imgs/2024camplit/WR-2024-Election-Family.jpg";
import { ContentfulEntries } from "../../interfaces/ContentfulEntries";

type Props = {
  aboutMe: AboutMeSection[];
};

const Literature = ({ aboutMe }: Props) => {
  const imagesArry = [
    {
      img: electionFamily,
      alt: "2024 Vote Team Sarlo - Community Service",
      priority: true,
    },
    {
      img: electionBios,
      alt: "2024 Vote Team Sarlo Bios",
      priority: false,
    },
    {
      img: electionTeam,
      alt: "2024 Vote Team Sarlo",
      priority: false,
    },
  ];

  const navBios = aboutMe.map((bio) => ({
    href: `/bios/${bio.fields.idTag}`,
    display: bio.fields.title,
  }));

  return (
    <Layout navBios={navBios}>
      <div className={styles.container}>
        <Head>
          <meta name="robots" content="all" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Literature</title>
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
          {imagesArry.map((img) => (
            <div key={img.alt} className={styles.modalImage}>
              <ImageModal img={img} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Literature;

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios(
    `https://cdn.contentful.com/spaces/nc2tb1hvkxx7/entries?access_token=${process.env.CONTENTFUL_TOKEN}&content_type=aboutMe`,
  );
  const { data } = res;

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

  aboutMeData = aboutMeData.sort(
    (a, b) => a.fields.displayOrder - b.fields.displayOrder,
  );

  return {
    props: {
      aboutMe: aboutMeData,
    },
  };
};
