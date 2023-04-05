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

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPwIncorrect, setIsPwIncorrect] = useState(false);
  const isPwIncorrectMsg = isPwIncorrect
    ? "At least 8 characters, No entirely numeric"
    : "Input your password here";

  const router = useRouter();

  //handleSubmit function
  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataTobeSent = {
      email: email,
      username: email,
      password: password,
    };
    console.log(dataTobeSent);

    if (isPwIncorrect === false) {
      console.log("you are in the right path");
      await api
        .post("/apiv01/userView/login/", dataTobeSent)
        .then((response) => {
          alert(response.data.message);
        })
        .catch((response) => {
          alert("Login credentials incorrect");
        });
      setEmail("");
      setPassword("");
      return;
    } else {
      alert("Incorrect password format");
      setPassword("");
      return;
    }
  };

  const validatePassword = (password) => {
    const regex = /^[0-9]+$/; // regex to check if the password is entirely numeric
    if (password.length < 8) {
      return true;
    } else if (regex.test(password)) {
      return true;
    }
    return false;
  };

  const handleInputChangeEmail = (e) => setEmail(e.target.value);
  const handleInputChangePw = (e) => {
    setPassword(e.target.value);
    setIsPwIncorrect(validatePassword(e.target.value));
    console.log(validatePassword(e.target.value));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
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
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item md={6}></Grid>
            <Grid item xs={12} md={6}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Login
                  </Typography>
                  <Box
                    component="form" // FORM starts here?
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          // name="email"
                          autoComplete="email"
                          value={email}
                          onChange={handleInputChangeEmail}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          // name="password"
                          // label="Password"
                          label={isPwIncorrectMsg}
                          type="password"
                          id="password"
                          autoComplete="new-password"
                          onChange={handleInputChangePw}
                          value={password}
                          error={isPwIncorrect}
                        />
                        <Link
                          href="/user/login"
                          style={{
                            color: "grey",
                            textDecoration: "none",
                          }}
                        >
                          Forgot your password?
                        </Link>
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Log in
                    </Button>
                    <Link href="/user/signup">
                      <h3>Don’t have an account? Sign-up!</h3>
                    </Link>
                    <Link
                      href="/waitList/"
                      style={{ textDecoration: "none", color: "grey" }}
                    >
                      <h3>Go to Waitlist page</h3>
                    </Link>
                    {/* <Grid container justifyContent="flex">
                      xfasdf
                    </Grid> */}
                  </Box>
                </Box>
              </Container>
            </Grid>
          </Grid>
        </div>
      </Box>
    </ThemeProvider>
  );
}
