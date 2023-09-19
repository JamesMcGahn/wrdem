import React from 'react';
import Head from 'next/head';
import ImageModal from '../../components/ui/ImageModal';
import Layout from '../../components/layout/Layout';
import styles from '../../styles/Literature.module.css';

import micheleBio from '../../public/static/imgs/2022camplit/michele-bio.jpeg';
import mikeBio from '../../public/static/imgs/2022camplit/mike-bio.jpeg';
import familyMailer1 from '../../public/static/imgs/2022camplit/family-mailing-1.jpeg';
import familyMailer2 from '../../public/static/imgs/2022camplit/family-mailing-2.jpeg';

const Literature = () => {
  const imagesArry = [
    {
      img: micheleBio,
      alt: 'Micheles Bio Literature',
      priority: true,
    },
    {
      img: mikeBio,
      alt: 'Mike Bio Literature',
      priority: false,
    },
    {
      img: familyMailer1,
      alt: 'Mike and Michelles Family Literature',
      priority: false,
    },
    {
      img: familyMailer2,
      alt: 'Mike and Michelles Family Literature (Continued)',
      priority: false,
    },
  ];

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <meta name="robots" content="all" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Literature</title>
          <meta name="description" content="Wood-Ridge Democrats" />
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.wrdems.com/" />
          <meta property="og:title" content="Wood-Ridge Democrats" />
          <meta property="og:description" content="Elect The Sarlo Team" />
          <meta property="og:image" content="https://www.wrdems.com/static/imgs/sarloteam.jpeg" />
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
