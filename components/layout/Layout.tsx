import React, { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import Nav from "./Nav";
import Footer from "./Footer";
import classes from "../../styles/Layout.module.css";
import { NavBios } from "../../interfaces/ContentDataProps";

type Props = {
  children?: ReactNode;
  navBios: NavBios[];
};

const Layout = ({ children, navBios }: Props) => (
  <>
    <Head>
      <meta name="robots" content="all" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
    <header>
      <Nav navBios={navBios} />
    </header>
    <div className={classes.main}>{children}</div>
    <Analytics />
    <Footer />
  </>
);

export default Layout;
