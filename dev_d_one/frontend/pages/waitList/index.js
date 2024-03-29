// To run locally,
// 1. Go to 'api_axios.js' and then change axios route to localhost.
// 2. Go to 'next.config.js' and then comment out the entire code to be diabled.

import * as React from "react";
// import { api, base_url } from "../../components/api_axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, TextField } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

import { useRouter } from "next/router";

import { createTheme, ThemeProvider } from "@mui/material/styles";

// export const api = axios.create({ baseURL: "http://localhost:8000" });
import { api, base_url } from "../../components/api_axios";

// export const api = axios.create({ baseURL: "http://localhost:8000" });
// export const api = axios.create({ baseURL: process.env.DJANGO_API_URL });
// export const api = axios.create({ baseURL: "http://backendcontainer:8000" });
// export const api = axios.create({ baseURL: `${process.env.BACKEND_ENDPOINT}` });
// export const api = axios.create({ baseURL: BACKEND_URL });

// export const base_url = `${process.env.BACKEND_ENDPOINT}`;
// console.log("api:", base_url);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

//pre-rendering with data.
// export async function getServerSideProps() {
//   console.log("inside getServerSideProps");
//   const loadedData = await loadDB();

//   return {
//     props: {
//       emailData: loadedData,
//     },
//   };
// }

// ================================================================================

export default function WaitList() {
  const [email, setEmail] = useState("");
  const [emailList, setEmailList] = useState([]);
  const [emailValidator, setEmailValidator] = useState(false);
  const emailVaidateErrorMsg = emailValidator
    ? "Invalid email format, please try again"
    : "Input your email address here";
  const router = useRouter();

  const loadDB = async () => {
    try {
      const emailApi = await api.get("/apiv01/emailView/");
      console.log("LoadDB (emailApi.data):", emailApi.data);
      setEmailList(emailApi.data);
      return emailApi.data || [];
    } catch (error) {
      console.error("Error in loadDB:", error);
    }
  };

  useEffect(() => {
    loadDB();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit Clicked");
    console.log("**email : ", email);

    if (emailValidator) {
      alert(emailVaidateErrorMsg);
      setEmail("");
    } else {
      try {
        await api.post("/apiv01/emailView/", { email: email });
        const loadedData = await loadDB();
        loadedData.map((data) => {
          if (data.email == email) {
            // console.log("inside loadedData before push", data.id);
            return router.push(`/waitList/${data.id}`);
          }
        });
        setEmailList(loadedData);
        setEmail("");
      } catch (error) {
        console.log("Duplicated Email or no Email input");
        console.log("error:", error.response);
        console.log(error);
        alert(error.response.data.email);
        setEmail("");
      }
    }
  };

  const handleInputChange = (e) => {
    // console.log("handleInputChange - e.target.value:", e.target.value);
    setEmail(e.target.value);

    if (!/\S+@\S+\.\S+/.test(e.target.value)) {
      setEmailValidator(true);
    } else {
      setEmailValidator(false);
    }
  };

  const handleClickDelete = async (id) => {
    console.log("handleClickDelete Clicked");
    // console.log("id: ", id);
    // try {
    await api.delete(`/apiv01/emailView/${id}/`);
    // } catch (e) {
    //   console.log("error");
    // }
    const loadedData = await loadDB();
    setEmailList(loadedData);
  };

  // // Components ==========================================

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
            href={`/apiv01/waitList/${data.id}`}
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
        <div
          style={{
            display: "flex",
            alignItems: "self-start",
            justifyContent: "space-between",
          }}
        >
          <img src="https://d-one.s3.us-west-2.amazonaws.com/LandingPage/static/img/Meetlof_logo.png"/>
          <div>
            <Button
              sx={{ marginRight: "1rem", borderRadius: "2rem" }}
              variant="outlined"
              size="large"
              color="inherit"
            >
              <InfoOutlinedIcon sx={{ marginRight: "5px" }} />
              About
            </Button>
            <Link href="/user/signup" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  marginRight: "1rem",
                  borderRadius: "2rem",
                  color: "black",
                }}
                variant="contained"
                size="large"
                color="inherit"
              >
                <EmojiEmotionsIcon sx={{ marginRight: "5px" }} />
                Join Beta
              </Button>
            </Link>
            <Link href="/user/login" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  marginRight: "1rem",
                  borderRadius: "2rem",
                  color: "black",
                }}
                variant="contained"
                size="large"
                color="inherit"
              >
                <EmojiEmotionsIcon sx={{ marginRight: "5px" }} />
                Beta Login
              </Button>
            </Link>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            paddingTop: "16rem",
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
                label={emailVaidateErrorMsg}
                variant="standard"
                value={email}
                color="primary"
                onChange={handleInputChange}
                error={emailValidator}
              />
              <Button
                variant="contained"
                type="submit"
                color={emailValidator ? "error" : "primary"}
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

          {/* <h5 style={{ marginTop: "4rem", color: "grey" }}>
            Below list is temporarily shown to see if REST api works with DB.
            When am email registered to email properly, it should be liseted
            below right away along with its id.
          </h5>
          <div>{emailListItems(emailList)}</div> */}
        </div>
      </div>
    </ThemeProvider>
  );
}
