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
  // const [email, setEmail] = useState();
  // const [username, setUsername] = useState();
  // const [password, setPassword] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwValidator, setPwValidator] = useState(false);
  //if true, it means password not matching. this boolean data goes into error prop of TextField to display red text
  const pwVaidateErrorMsg = pwValidator
    ? "Password not matching"
    : "Input your password here";

  useEffect(() => {
    if (password === confirmPassword) {
      setPwValidator(false); //if false, it means matching
    } else {
      setPwValidator(true);
    }
  }, [password, confirmPassword]);

  const router = useRouter();

  //handleSubmit function
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    const dataTobeSent = {
      email: email,
      username: email,
      password: password,
    };
    // console.log("**DATATOBESENT: ", dataTobeSent);

    if (!pwValidator) {
      await api
        .post("/apiv01/userView/", dataTobeSent)
        .then((res) =>
          console.log("## ## ## ## --- successfully signed up --- ## ## ##")
        );
      //After creating a new user in the backend, the code below will redirect a user to the registered page.
      const users = await api.get("/apiv01/userView/"); //if it gets data here, it means the user data has been successfully created
      users.data.map((data) => {
        console.log("data inside map:: ", data);
        if (data.email === dataTobeSent.email) {
          router.push({
            pathname: `/user/${data.id}`,
            query: { signedUpId: data.id, email: data.email },
          });
        }
      });
    } else {
      alert("password not matching");
    }
  };

  const handleInputChangeEmail = (e) => setEmail(e.target.value);
  const handleInputChangePw = (e) => setPassword(e.target.value);
  const handleInputChangeCfPw = (e) => setConfirmPassword(e.target.value);

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
                    Sign up
                  </Typography>
                  <Box
                    component="form" // FORM starts here?
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                  >
                    <Grid container spacing={2}>
                      {/* <Grid item xs={12}>
                        <TextField
                          // autoComplete="given-name"
                          name="username"
                          required
                          fullWidth
                          id="username"
                          label="User Name"
                          autoFocus
                        />
                      </Grid> */}
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
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                          onChange={handleInputChangePw}
                          value={password}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          // name="confirmPassword"
                          label={pwVaidateErrorMsg}
                          type="password"
                          id="confirmPassword"
                          autoComplete="new-password"
                          onChange={handleInputChangeCfPw}
                          value={confirmPassword}
                          error={pwValidator}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              value="allowExtraEmails"
                              color="primary"
                            />
                          }
                          label="I want to receive inspiration, marketing promotions and updates via email."
                          name="checked"
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button>
                    <Link
                      href="/waitList/"
                      style={{ textDecoration: "none", color: "grey" }}
                    >
                      <h3>Move to waitlist page</h3>
                    </Link>
                    <Grid container justifyContent="flex-end"></Grid>
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
