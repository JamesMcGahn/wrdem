import React from "react";
import Head from "next/head";
import ImageModal from "../../components/ui/ImageModal";
import Layout from "../../components/layout/Layout";
import styles from "../../styles/Literature.module.css";

import electionBios from "../../public/static/imgs/2023camplit/WR-2023-Election-Bios.jpg";
import electionTeam from "../../public/static/imgs/2023camplit/WR-2023-Election-Team.jpg";

const Literature = () => {
  const imagesArry = [
    {
      img: electionBios,
      alt: "2023 Re-Elect Team Sarlo Bios",
      priority: true,
    },
    {
      img: electionTeam,
      alt: "2023 Re-Elect Team Sarlo",
      priority: false,
    },
  ];

  return (
    <Layout>
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
