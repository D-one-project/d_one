import * as React from "react";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { TextField } from "@mui/material";

export const api = axios.create({ baseURL: "http://localhost:8000" });
// export const api = axios.create({ baseURL: "http://backendcontainer:8000" });
// console.log("api:", api);

const loadDB = async () => {
  const emailApi = await api.get("/api/emailView/");
  console.log("LoadDB (emailApi.data):", emailApi.data);
  return emailApi.data || [];
};

//pre-rendering with data.
export async function getServerSideProps() {
  console.log("inside getServerSideProps");
  const loadedData = await loadDB();

  return {
    props: {
      emailData: loadedData,
    },
  };
}

// ================================================================================

export default function WaitList(props) {
  const [email, setEmail] = useState("");
  const [emailList, setEmailList] = useState(props.emailData);
  // console.log("emailList: ", emailList);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("handleSubmit Clicked");
    console.log("**email : ", email);

    try {
      await api.post("/api/emailView/", { email: email });
      const loadedData = await loadDB();
      setEmailList(loadedData);
      setEmail("");
    } catch (error) {
      console.log("Duplicated Email or no Email input");
      console.log("error:", error.response);
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    console.log("handleInputChange - e.target.value:", e.target.value);
    setEmail(e.target.value);
  };

  const handleClickDelete = async (id) => {
    console.log("handleClickDelete Clicked");
    console.log("id: ", id);
    // try {
    await api.delete(`/api/emailView/${id}/`);
    // } catch (e) {
    //   console.log("error");
    // }
    const loadedData = await loadDB();
    setEmailList(loadedData);
  };

  // Components ==========================================

  const emailListItems = (emailList) =>
    emailList.map((data) => {
      return (
        <li key={data.id}>
          <button
            onClick={() => handleClickDelete(data.id)}
            style={{ marginRight: "1rem" }}
          >
            X
          </button>
          <Link
            href={`/waitList/${data.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {data.email} // <b>(id:){data.id}</b>
          </Link>
        </li>
      );
    });

  return (
    <div
      style={{
        // margin: "2rem",
        padding: "2rem",
        height: "100vh",
        color: "white",
        backgroundImage:
          "url('https://d-one.s3.us-west-2.amazonaws.com/LandingPage/static/img/waitlist_background.png')",
      }}
    >
      <img src="https://d-one.s3.us-west-2.amazonaws.com/LandingPage/static/img/Meetlof_logo.png" />
      <h1>Wait-list</h1>
      <form onSubmit={handleSubmit}>
        {/* <input
          type="text"
          name="emailInput"
          value={email}
          onChange={handleInputChange}
        /> */}
        <TextField
          sx={{
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiInput-underline:before": {
              borderBottomColor: "white",
            },
            "& .MuiInputBase-input": {
              color: "white",
            },
          }}
          color="success"
          fullWidth
          // id="standard-basic"
          label="Input your email address here"
          variant="standard"
          value={email}
          onChange={handleInputChange}
        />
        <button type="submit">
          <b>Count me in!</b>
        </button>
      </form>
      <h2>Input email address to be in the wait-list.</h2>
      <h5>Below list is temporarily shown to see if REST api works with DB</h5>
      <div>{emailListItems(emailList)}</div>
    </div>
  );
}
