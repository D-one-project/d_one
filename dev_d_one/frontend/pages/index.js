import * as React from "react";
import { Box } from "@mui/material";

import Head from "next/head";
import NavBar from "../components/navBar";
import FeaturedPost from "../components/mainPage/featuredPost";
import BodyPost from "../components/mainPage/bodyPost";
import Footer from "../components/footer";

import { fakeData } from "../fakeData.js";
import axios from "axios";

//pre-rendering with data.
export async function getServerSideProps() {
  console.log("inside getServerSideProps");

  // console.log("****** Process *******:", process.env.NEXT_ENV_VAR);

  ("---------------------------=-=-= baseURL below -=-=-=----------------------------");
  const api = axios.create({ baseURL: "http://172.26.0.2:8000" });

  // console.log("api: ", api);
  console.log(
    "---------------------------=-=-=-=-=-=----------------------------"
  );

  const recevedFromApi1 = await api.get("/api/mainFeaturedPostView/");
  const recevedFromApi2 = await api.get("/api/bodyPostView/");
  const recevedFromApi3 = await api.get("/api/newsPost/");

  // ?format=json

  // console.log("receved-API-data1: ", recevedFromApi1.data);
  // console.log("receved-API-data2: ", recevedFromApi2.data);
  // console.log("receved-API-data3: ", recevedFromApi3.data);

  // need to update code for axios to get multiple urls at once and put them together into a single object? to be sent to fetchedData

  const fetchedDataTest = {
    mainFeaturedPost: recevedFromApi1.data[0],
    bodyPost: recevedFromApi2.data,
    newsPost: recevedFromApi3.data,
  };

  // console.log("**** fetcheddataTest:", fetchedDataTest);
  const fetchedData = fetchedDataTest;

  // console.log("-----------------------");
  // const envValue = process.env.NEXT_ENV_VAR;
  // console.log("envValue:", envValue);
  // console.log("-----------------------");

  // const fetchedData = fakeData;
  // console.log("fetched(hard coding) **** : ", fetchedData);

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
