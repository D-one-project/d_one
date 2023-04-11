import { api } from "../../components/api_axios";
import { useEffect, useState } from "react";

import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import CssBaseline from "@mui/material/CssBaseline";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import {
  Button,
  Link,
  Grid,
  Box,
  TextField,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import Image from "next/image";
// const theme = createTheme();

import Cookies from "js-cookie";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const buttonList = [
    { buttonName: "Invite Friends", url: "invite" },
    { buttonName: "Plan a date", url: "planning" },
    { buttonName: "Edit Profile", url: "editProfile" },
    { buttonName: "Friends", url: "friendList" },
  ];

  const router = useRouter();

  //handleSubmit function
  const handleSubmit = async (event) => {
    const dataTobeSent = {
      email: email,
      username: email,
      password: password,
    };
    console.log(dataTobeSent);
  };

  const handleInputChangeEmail = (e) => setEmail(e.target.value);
  const handleInputChangePw = (e) => setPassword(e.target.value);

  const profileComponents = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                src="/images/temp/userPhoto.png" // Route of the image file
                height={240} // Desired size with correct aspect ratio
                width={240} // width={144} // Desired size with correct aspect ratio
                alt="User Photo"
              />

              <Typography component="h1" variant="h5">
                MeetLof
              </Typography>
              <Box
                component="form" // FORM starts here?
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Card
                      sx={{
                        minWidth: "70vw",
                        backgroundColor: "transparent",
                      }}
                    >
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Short Bio:
                        </Typography>
                        <Typography variant="h5" component="div" align="center">
                          Engineer, passionate about food, specially pizza, love
                          rock music, and always down for a good movie
                        </Typography>
                      </CardContent>
                    </Card>
                    <Grid container sx={{ marginBottom: "2rem" }}>
                      <Grid item xs={6}>
                        <div>Los Angeles, CA</div>
                        <div>Male, 29</div>
                      </Grid>
                      <Grid item xs={6}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          member since May 2023
                        </div>
                      </Grid>
                    </Grid>
                    <Card
                      sx={{
                        minWidth: "70vw",
                        backgroundColor: "transparent",
                      }}
                    >
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Interests:
                        </Typography>
                        <Typography
                          variant="h5"
                          component="div"
                          align="center"
                          height="180px"
                          overflow="auto"
                        >
                          Movies, Thriller and drama Food, Italian and pizza
                          Activities, biking and snowboarding
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
    );
  };

  const bottomButtonComponents = () =>
    buttonList.map((data, idx) => {
      return (
        <Link
          href="/test_url/test"
          style={{ textDecoration: "none" }}
          key={idx}
        >
          <Button
            sx={{
              marginRight: "1rem",
              borderRadius: "2rem",
              color: "black",
              width: "180px",
              height: "50px",
            }}
            variant="contained"
            size="large"
            color="success"
          >
            {data.buttonName}
          </Button>
        </Link>
      );
    });

  const handleVerifyBtn = async (e) => {
    console.log("button clicked");

    const token = Cookies.get("jwt");
    console.log("token:", token);
    const options = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await api
      .get("/apiv01/emailView/", options)
      .then((data) => {
        console.log("data from api:", data);
      })
      .catch((res) => {
        alert(`Error: ${res.response.data.detail}`);
        alert("You need to log-in first");
        router.push("/user/login");
      });
  };

  const loggedInVerificationComponent = () => {
    return (
      <div
        style={{
          padding: "1rem",
        }}
      >
        <Button onClick={handleVerifyBtn} variant="contained">
          Pull data test through user authentication [TEST]
        </Button>
      </div>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{ overflow: "scroll" }}
        sx={{
          // margin: "2rem",
          padding: "1rem",
          height: "100vh",
          width: "100vw",
          color: "white",
          backgroundImage:
            "url('https://d-one.s3.us-west-2.amazonaws.com/LandingPage/static/img/signup_background.png')",
          backgroundSize: "cover",
          backgroundPosition: "left",
          // display: "flex",
          // flexDirection: "row",
        }}
      >
        <Link href="/waitList">
          <img
            src="https://d-one.s3.us-west-2.amazonaws.com/LandingPage/static/img/Meetlof_logo.png"
            height="100px"
            style={{ position: "absolute" }}
          />
        </Link>
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {profileComponents()}

          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {bottomButtonComponents()}
          </div>
          {loggedInVerificationComponent()}
        </div>
      </Box>
    </ThemeProvider>
  );
}
