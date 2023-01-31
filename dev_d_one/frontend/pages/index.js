import * as React from "react";
import { Box } from "@mui/material";

import Head from "next/head";
import NavBar from "../components/navBar";
import FeaturedPost from "../components/mainPage/featuredPost";
import BodyPost from "../components/mainPage/bodyPost";
import Footer from "../components/footer";
import useFetch from '../src/hooks/useFetch';

import { fakeData } from "../fakeData.js";
import axios from "axios";

//pre-rendering with data.
export async function getServerSideProps() {
  // console.log("inside getServerSideProps");
  // const dd_test = `${process.env.DJANGO_BACKEND_URL}/api/mainFeaturedPostView/`;//process.env.DJANGO_BACKEND_URL;
  const base_url = process.env.REACT_APP_URI;
  //axios.defaults.baseURL = process.env.REACT_APP_URI;
  const recevedFromApi1 = await axios.get(
      base_url+'/api/mainFeaturedPostView'
  );
  const recevedFromApi2 = await axios.get(
      base_url+'/api/bodyPostView'
  );
  const recevedFromApi3 = await axios.get(
      base_url+'/api/newsPost'
  );

    console.log("inside getServerSideProps");
    // const recevedFromApi1 = useFetch('/api/mainFeaturedPostView/')
    // const recevedFromApi2 = useFetch('/api/bodyPostView/')
    // const recevedFromApi3 = useFetch('/api/newsPost/')

  // console.log("receved-API-data1: ", recevedFromApi1.data);
  // console.log("receved-API-data2: ", recevedFromApi2.data);
  // console.log("receved-API-data3: ", recevedFromApi3.data);

  //need to update code for axios to get multiple urls at once and put them together into a single object? to be sent to fetchedData
  //
  const fetchedDataTest = {
    mainFeaturedPost: recevedFromApi1.data[0],
    bodyPost: recevedFromApi2.data,
    newsPost: recevedFromApi3.data,
  };
  //
  // console.log("**** fetcheddataTest:", fetchedDataTest);
  //
  // const fetchedData = fetchedDataTest;
  // const fetchedData = fakeData;
  // console.log("fetched(hard coding) **** : ", fetchedData);

  return {
    props: {
      fetchedData,
      dd_test,
      recevedFromApi1,
    },
  };
}

export default function Index({ fetchedData,dd_test ,recevedFromApi1}) {
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
      {dd_test}
      {recevedFromApi1}
    </>
  );
}
