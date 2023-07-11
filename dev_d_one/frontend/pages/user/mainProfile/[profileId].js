import NewProfileComponent from "./newProfile";

// import { api } from "../../../components/api_axios";
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
  // TextField,
  CssBaseline,
  // FormControlLabel,
  // Checkbox,
  Card,
  CardContent,
  Typography,
  // CardActions,
} from "@mui/material";

// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import Image from "next/image";

import { fetchData } from "../../../utils/fetchData";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});


export default function mainProfile() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [userdata, setdata] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const buttonList = [
    { buttonName: "Invite Friends", url: "invite" },
    { buttonName: "Plan a date", url: "planning" },
    { buttonName: "Edit Profile", url: "edit" },
    { buttonName: "Friends", url: "friendList" },
  ];

  async function loadData() {
    await fetchData()
      .then(res => {
        console.log('Fetched Data: ', res.data)
        setdata(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log('Fetching data has errors:', err);
        setLoading(true);
        router.push('/user/login/');
      })
  }


  useEffect(() => {
    loadData();
  }, [])


  // const handleInputChangeEmail = (e) => setEmail(e.target.value);
  // const handleInputChangePw = (e) => setPassword(e.target.value);

  function logoutBtn() {
    console.log('logout clicked');
    localStorage.clear();
    setLoading(true);
    router.push('/user/login/');
  }

  // editScreenComponent = profileComponents + bottomButtonComponents
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
              <Button onClick={logoutBtn}>LOGOUT</Button>
              <Image
                src="/images/temp/userPhoto.png" // Route of the image file
                height={240} // Desired size with correct aspect ratio
                width={240} // width={144} // Desired size with correct aspect ratio
                alt="User Photo"
              />

              <Typography component="h1" variant="h5">
                {loading ? '' : userdata.username}
              </Typography>
              <Box
                component="form" // FORM starts here?
                noValidate
                // onSubmit={handleSubmit}
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
                          {loading ? '' : userdata.profile.bio}
                        </Typography>
                      </CardContent>
                    </Card>
                    <Grid container sx={{ marginBottom: "2rem" }}>
                      <Grid item xs={6}>
                        <div>{`${userdata.profile.city}, ${userdata.profile.state}`}</div>
                        <div>{`${userdata.profile.gender}, Age unknonwn`}</div>
                      </Grid>
                      <Grid item xs={6}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          {`Since ${String(userdata.date_joined).slice(0, 7)}`}
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
                          {userdata.profile.interest}
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
          href={`./${data.url}/${userdata.username}`}
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


  const editScreenComponent = () => {
    return (
      <>
        {loading ? '......' : profileComponents()}
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {loading ? '......' : bottomButtonComponents()}
        </div>
      </>
    )
  }


  // const newProfileScreencomponent = () => {
  //   return (
  //     <>
  //       {newProfile()}
  //     </>
  //   )
  // }

  // Rendering starts here
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
          {console.log('userdata.profile:', userdata.profile)}
          {loading ? '......' : userdata.profile ? editScreenComponent() : <NewProfileComponent data={userdata} loadData={loadData} />}
          {console.log('can u see here?')}
        </div>
      </Box>
    </ThemeProvider>
  );
}
