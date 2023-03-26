import { api } from "../../components/api_axios";

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
  const router = useRouter();

  //handleSubmit function
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataTobeSent = {
      email: data.get("email"),
      password: data.get("password"),
      username: data.get("username"),
      testData: "test",
    };
    console.log(dataTobeSent);
    await api.post("/apiv01/userView/", dataTobeSent);

    const users = await api.get("/apiv01/userView/");
    users.data.map((data) => {
      // console.log("data inside map:: ", data);
      if (data.email === dataTobeSent.email) router.push(`/user/${data.id}`);
    });

    //To use validation interactively upon inputting data, then use state variables.
    //It's using FormData for now to collect data from each component and then to send them over to backend
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
                    Sign up
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
                          // autoComplete="given-name"
                          name="username"
                          required
                          fullWidth
                          id="username"
                          label="User Name"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
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
