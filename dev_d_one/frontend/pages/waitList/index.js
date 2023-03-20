import * as React from "react";
// import { api, base_url } from "../../components/api_axios";
import { useState } from "react";
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
console.log("api:", base_url);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const loadDB = async () => {
  try {
    const emailApi = await api.get("/apiv01/emailView/");
    console.log("LoadDB (emailApi.data):", emailApi.data);
    // return emailApi.data || [];
    return [];
  } catch (error) {
    console.error("Error in loadDB:", error);
    return [];
  }
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
  console.log("backend_url");
  console.log(base_url);
  const [emailList, setEmailList] = useState(props.emailData);
  // console.log("emailList: ", emailList);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("handleSubmit Clicked");
    console.log("**email : ", email);

    // const data_email = { email: email };
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data_email),
    // };

    // try {
    //   // await api.post(base_url+"/api/emailView/", { "email": email });
    //   console.log("----------after json---------");
    //   console.log(requestOptions);
    //   fetch("/apiv01/emailView/", requestOptions)
    //     .then((response) => {
    //       if (response.ok) {
    //         return response.json();
    //       } else {
    //         throw new Error("Network response was not ok.");
    //       }
    //     })
    //     .then((data) => {
    //       console.log(data);
    //     })
    //     .catch((error) => {
    //       console.error("There was a problem with the fetch operation:", error);
    //     });
    //   const loadedData = await loadDB();
    //   loadedData.map((data) => {
    //     if (data.email == email) router.push(`/waitList/${data.id}`);
    //   });
    //   // setEmailList(loadedData);
    //   setEmail("");
    // } catch (error) {
    //   console.log("Duplicated Email or no Email input");
    //   console.log("error:", error.response);
    //   console.log(error);
    //   setEmail("");
    // }
  };

  const handleInputChange = (e) => {
    console.log("handleInputChange - e.target.value:", e.target.value);
    // setEmail(e.target.value);
  };

  const handleClickDelete = async (id) => {
    console.log("handleClickDelete Clicked");
    // console.log("id: ", id);
    // // try {
    // await api.delete(`/apiv01/emailView/${id}/`);
    // // } catch (e) {
    // //   console.log("error");
    // // }
    // const loadedData = await loadDB();
    // setEmailList(loadedData);
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
          <img src="https://d-one.s3.us-west-2.amazonaws.com/LandingPage/static/img/Meetlof_logo.png" />
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
                Join us
              </Button>
            </Link>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            paddingTop: "12rem",
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
