import * as React from "react";
import { Box } from "@mui/material";

import Head from "next/head";
import NavBar from "../components/navBar";
import FeaturedPost from "../components/mainPage/featuredPost";
import BodyPost from "../components/mainPage/bodyPost";
import Footer from "../components/footer";

import { fakeData } from "../fakeData.js";

//pre-rendering with data.
export async function getStaticProps() {
  const fetchedData = fakeData;
  return {
    props: {
      fetchedData,
    },
  };
}

export default function Index({ fetchedData }) {
  const { mainFeaturedPost, bodyPost, newsPost } = fetchedData;

  return (
    <>
      <Head>
        <title>D-one-project</title>
      </Head>

      <NavBar />
      <FeaturedPost {...mainFeaturedPost} />
      <BodyPost bodyPost={bodyPost} newsPost={newsPost} />
      <Footer />
      
    </>
  );
}
