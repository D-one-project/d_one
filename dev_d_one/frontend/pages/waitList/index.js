import * as React from "react";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { Button, TextField } from "@mui/material";

import { useRouter } from "next/router";

import { createTheme, ThemeProvider } from "@mui/material/styles";

export const api = axios.create({ baseURL: "http://localhost:8000" });
// export const api = axios.create({ baseURL: "http://backendcontainer:8000" });
// console.log("api:", api);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

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

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("handleSubmit Clicked");
    console.log("**email : ", email);

    try {
      await api.post("/api/emailView/", { email: email });
      const loadedData = await loadDB();
      loadedData.map((data) => {
        if (data.email == email) router.push(`/waitList/${data.id}`);
      });
      // setEmailList(loadedData);
      setEmail("");
    } catch (error) {
      console.log("Duplicated Email or no Email input");
      console.log("error:", error.response);
      console.log(error);
      setEmail("");
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
            style={{ marginRight: "1rem", backgroundColor: "grey" }}
          >
            X
          </button>
          <Link
            href={`/waitList/${data.id}`}
            style={{ textDecoration: "none", color: "grey" }}
          >
            {data.email} // <b>(id:){data.id}</b>
          </Link>
        </li>
      );
    });

  return (
    <ThemeProvider theme={darkTheme}>
      <div
        style={{
          // margin: "2rem",
          padding: "2rem",
          height: "100vh",
          color: "white",
          overflow: "auto",
          backgroundImage:
            "url('https://d-one.s3.us-west-2.amazonaws.com/LandingPage/static/img/waitlist_background.png')",
        }}
      >
        <img src="https://d-one.s3.us-west-2.amazonaws.com/LandingPage/static/img/Meetlof_logo.png" />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            paddingTop: "5rem",
            paddingLeft: "2rem",
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* <input
          type="text"
          name="emailInput"
          value={email}
          onChange={handleInputChange}
        /> */}
            <div style={{ display: "flex" }}>
              <TextField
                fullWidth
                label="Input your email address here"
                variant="standard"
                value={email}
                color="primary"
                onChange={handleInputChange}
              />
              <Button
                variant="contained"
                type="submit"
                color="primary"
                sx={{ width: "200px" }}
              >
                Count me in!
              </Button>
            </div>
          </form>
          <h2>
            Join our waitlist today for the chance to win one of ten $25 gift
            cards.
          </h2>

          <h5 style={{ marginTop: "4rem", color: "grey" }}>
            Below list is temporarily shown to see if REST api works with DB.
            When am email registered to email properly, it should be liseted
            below right away along with its id.
          </h5>
          <div>{emailListItems(emailList)}</div>
        </div>
      </div>
    </ThemeProvider>
  );
}
