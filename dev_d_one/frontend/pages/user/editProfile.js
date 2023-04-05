import { api } from "../../components/api_axios";
import { useEffect, useState } from "react";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
// const theme = createTheme();

import Image from "next/image";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwValidator, setPwValidator] = useState(false);
  const pwVaidateErrorMsg = pwValidator
    ? "Password not matching"
    : "Input your password here";

  //   useEffect(() => {
  //     if (password === confirmPassword) {
  //       setPwValidator(false); //if false, it means matching
  //     } else {
  //       setPwValidator(true);
  //     }
  //   }, [password, confirmPassword]);

  //To avoid repeating the same type of component, define the below data type and loop them over for this page component.
  const dataSetFormatLeft = [
    { name: "email", selectFiled: false, variant: "standard" },
    { name: "firstName", selectFiled: false, variant: "standard" },
    { name: "lastName", selectFiled: false, variant: "standard" },
    { name: "city", selectFiled: false, variant: "standard" },
    { name: "state", selectFiled: false, variant: "standard" },
    { name: "single", selectFiled: true, variant: "filled" },
    { name: "gender", selectFiled: true, variant: "filled" },
  ];

  const dataSetFormatRight = [
    { name: "shortBio", label: "up to 50 words" },
    { name: "interests", label: "up to 100 words" },
  ];

  const router = useRouter();

  //handleSubmit function
  const handleSubmit = async (event) => {
    console.log("handleSubmit clicked");
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    const dataTobeSent = {
      email: email,
      username: email,
      password: password,
      // testData: "test",
      // if passwrod not matching, it shouldn't be running
    };
    console.log(dataTobeSent);

    // if (!pwValidator) {
    //   await api.post("/apiv01/userView/", dataTobeSent);

    //   const users = await api.get("/apiv01/userView/");
    //   users.data.map((data) => {
    //     // console.log("data inside map:: ", data);
    //     if (data.email === dataTobeSent.email) router.push(`/user/${data.id}`);
    //   });
    // } else {
    //   alert("password not matching");
    // }
  };

  const handleInputChangeEmail = (e) => setEmail(e.target.value);
  const handleInputChangePw = (e) => setPassword(e.target.value);
  const handleInputChangeCfPw = (e) => setConfirmPassword(e.target.value);

  const profileComponentsLeft = () =>
    dataSetFormatLeft.map((data) => {
      return (
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            // name="confirmPassword"
            label={data.name}
            // type="password"
            id={data.name}
            autoComplete="new-password"
            onChange={handleInputChangeCfPw}
            value=""
            error={pwValidator}
            variant={data.variant}
            select={data.selectFiled}
          />
        </Grid>
      );
    });

  const profileComponentsRight = () =>
    dataSetFormatRight.map((data) => {
      return (
        <Grid item xs={12} sx={{ marginBottom: "4rem" }}>
          {data.name.toUpperCase()}:
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            sx={{ marginTop: "1rem" }}
            // name="confirmPassword"
            label={data.label}
            // type="password"
            id={data.name}
            // autoComplete="new-password"
            // onChange={handleInputChangeCfPw}
            // defaultValue="blah blah blah blah"
            // error={pwValidator}
            variant="filled"
          />
        </Grid>
      );
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          color: "white",
          backgroundImage:
            "url('https://d-one.s3.us-west-2.amazonaws.com/LandingPage/static/img/signup_background.png')",
          backgroundSize: "cover",
          backgroundPosition: "left",
        }}
      >
        <Link href="/waitList">
          <img
            src="https://d-one.s3.us-west-2.amazonaws.com/LandingPage/static/img/Meetlof_logo.png"
            height="100px"
            style={{ position: "absolute", top: "1rem", left: "1rem" }}
          />
        </Link>
        <Button
          sx={{
            marginRight: "1rem",
            borderRadius: "2rem",
            color: "white",
            height: "50px",
            position: "absolute",
            right: "0%",
            top: "1rem",
          }}
          variant="contained"
          size="large"
          color="success"
        >
          Deactivate Account
        </Button>
        <div
          style={{
            // height: "100%",
            paddingTop: "7rem",
            display: "flex",
            alignItems: "flex-end",
            // backgroundColor: "blue",
            paddingBottom: "2rem",
            overflow: "scroll",
          }}
        >
          <Grid
            container
            // spacing={2}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid item xs={12} md={6}>
              <Container
                // component="main"
                maxWidth="sm"
                style={{
                  //   backgroundColor: "red",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  paddingBottom: "4rem",
                }}
              >
                <Grid
                  container
                  spacing={2}
                  //   style={{ backgroundColor: "red", height: "100%" }}
                  //   alignItems="flex-end"
                >
                  {profileComponentsLeft()}
                </Grid>
                {/* </Box> */}
              </Container>
            </Grid>
            <Grid item xs={12} md={6}>
              <Container component="main" maxWidth="sm">
                <Grid
                  container
                  spacing={2}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    label="haha"
                  >
                    <Image
                      src="/images/temp/userPhoto.png" // Route of the image file
                      height={240} // Desired size with correct aspect ratio
                      width={240} // width={144} // Desired size with correct aspect ratio
                      // alt="Your Name"
                    />
                  </Box>
                  {profileComponentsRight()}
                </Grid>
              </Container>
            </Grid>
            <Button
              sx={{
                borderRadius: "2rem",
                color: "white",
                height: "50px",
                width: "300px",
                marginTop: "2rem",
              }}
              //   fullWidth
              variant="contained"
              //   size="large"
              color="success"
            >
              Submit
            </Button>
          </Grid>
        </div>
      </Box>
    </ThemeProvider>
  );
}
