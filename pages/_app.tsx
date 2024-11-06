import React from "react";
import { Inter, Source_Sans_3 } from "next/font/google";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const sourceSansPro = Source_Sans_3({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
  display: "swap",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.className} ${sourceSansPro.className}`}>
      <Component {...pageProps} />{" "}
    </div>
  );
}

export default MyApp;
