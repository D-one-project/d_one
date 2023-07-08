import { useEffect, useState } from "react";

import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";

import { fetchData } from "../../../../utils/fetchData";

import Image from "next/image";
import { api } from "../../../../components/api_axios";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function EditProfile() {
  const [email, setEmail] = useState("");
  const [userdata, setdata] = useState({
    email: '',
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    status: '',
    gender: '',
    bio: '',
    interest: '',
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwValidator, setPwValidator] = useState(false);
  const pwVaidateErrorMsg = pwValidator
    ? "Password not matching"
    : "Input your password here";;

  //To avoid repeating the same type of component, define the below data type and loop them over for this page component.
  const dataSetFormatLeft = [
    { name: "email", selectFiled: false, variant: "standard" },
    { name: "firstName", selectFiled: false, variant: "standard" },
    { name: "lastName", selectFiled: false, variant: "standard" },
    { name: "city", selectFiled: false, variant: "standard" },
    { name: "state", selectFiled: false, variant: "standard" },
    { name: "status", selectFiled: true, variant: "filled" },
    { name: "gender", selectFiled: true, variant: "filled" },
  ];

  const dataSetFormatRight = [
    { name: "bio", label: "up to 50 words" },
    { name: "interest", label: "up to 100 words" },
  ];

  const router = useRouter();


  useEffect(() => {
    async function loadData() {
      await fetchData()
        .then(res => {
          console.log('Fetched Data: ', res.data)
          setdata({
            email: res.data.email,
            firstName: res.data.username,
            lastName: res.data.username,
            city: res.data.profile.city,
            state: res.data.profile.state,
            status: res.data.profile.status,
            gender: res.data.profile.gender,
            bio: res.data.profile.bio,
            interest: res.data.profile.interest,
          })
        })
        .catch(err => {
          console.log('Fetching data has errors:', err)
          router.push('/user/login/')
        })
    }
    loadData();
  }, [])

  // PUT with {id} to update user profile details
  async function sendEditProfile() {
    const tokenSet = JSON.parse(localStorage.getItem('tokenSet'));
    const options = {
      headers: { Authorization: `Token ${tokenSet.token}` },
    };

    const { city, state, status, gender, bio, interest } = userdata;
    // const updatedData = { city };
    const updatedData = { city, state, status, gender, bio, interest };

    console.log('updatedData: ', updatedData);
    console.log('token user id:', tokenSet.user_id)

    let profile_id = ''

    await api.get(`/apiv01/userView/${tokenSet.user_id}/`, options).then(res => {
      console.log(res.data);
      profile_id = res.data.profile.id
      console.log('여긴 작동햇으요')
    })

    await api.put(`/apiv01/userProfileView/${profile_id}/`, updatedData, options).then(res => {
      console.log('data has been sent');
      console.log(updatedData);

      router.push('./')
    })
    
  }


  //handleSubmit function
  const handleSubmit = async (event) => {
    console.log("handleSubmit clicked");
    console.log('userdata: ', userdata);
    sendEditProfile();

  };


  const handleDataOnChange = (res) => {
    setdata({
      ...userdata, //To match the userdata value format
      [res.target.id]: res.target.value
    })
  }

  const profileComponentsLeft = () =>
    dataSetFormatLeft.map((data, idx) => {
      return (
        <Grid item xs={12} key={idx}>
          {/* {console.log('------:', data)} */}
          <TextField
            required
            fullWidth
            // name="confirmPassword"
            label={data.name}
            // type="password"
            id={data.name}
            autoComplete="new-password"
            // onChange={handleInputChangeCfPw}
            onChange={(res) => handleDataOnChange(res)}
            value={userdata[data.name]}
            error={pwValidator}
            variant={data.variant}
          // select={data.selectFiled}
          />
        </Grid>
      );
    });

  const profileComponentsRight = () =>
    dataSetFormatRight.map((data, idx) => {
      return (
        <Grid item xs={12} sx={{ marginBottom: "4rem" }} key={idx}>
          {data.name.toUpperCase()}
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            sx={{ marginTop: "1rem" }}
            // name="confirmPassword"
            label={data.label}
            value={userdata[data.name]}
            // type="password"
            id={data.name}
            // autoComplete="new-password"
            // onChange={handleInputChangeCfPw}
            onChange={(res) => handleDataOnChange(res)}
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
                      alt="userPhoto"
                      priority={true} //??? due to err msg, I added but don't know what it is exactly for, lol.
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
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </div>
      </Box>
    </ThemeProvider>
  );
}
