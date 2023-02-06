import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { CardMedia } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import { Paper } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

export async function getServerSideProps() {
  console.log("inside getServerSideProps");

  // const api = axios.create({ baseURL: "http://backendcontainer:8000" });

  //hardcoding
  const api = axios.create({ baseURL: "http://54.218.116.151:8000" });
  const recevedFromApi1 = await api.get("/api/mainFeaturedPostView/");
  const recevedFromApi2 = await api.get("/api/bodyPostView/");
  const recevedFromApi3 = await api.get("/api/newsPost/");

  const fetchedDataTest = {
    mainFeaturedPost: recevedFromApi1.data[0],
    bodyPost: recevedFromApi2.data,
    newsPost: recevedFromApi3.data,
  };

  const fetchedData = fetchedDataTest;

  console.log("fetchedData : ", fetchedData);

  return {
    props: {
      fetchedData,
    },
  };
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        D-one-project
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const tiers = [
  {
    title: "Free",
    subheader: "2nd Most popular",
    price: "0",
    description: [
      "10 users included",
      "2 GB of storage",
      "Help center access",
      "Email support",
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
  },
  {
    title: "Pro",
    subheader: "Most popular",
    price: "15",
    description: [
      "20 users included",
      "10 GB of storage",
      "Help center access",
      "Priority email support",
    ],
    buttonText: "Get started",
    buttonVariant: "contained",
  },
  {
    title: "Enterprise",
    subheader: "3rd Most popular",
    price: "30",
    description: [
      "50 users included",
      "30 GB of storage",
      "Help center access",
      "Phone & email support",
    ],
    buttonText: "Contact us",
    buttonVariant: "outlined",
  },
];

const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
  },
  {
    title: "Features",
    description: [
      "Cool stuff",
      "Random feature",
      "Team feature",
      "Developer stuff",
      "Another one",
    ],
  },
  {
    title: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource",
    ],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
  },
];

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
  typography: {
    fontFamily: ["BlinkMacSystemFont"].join(","),
    // fontSize: "10",
  },
});

// carousel - start

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};

const newsCards = (data) =>
  data.map((data) => {
    return (
      <Paper elevation={12} sx={{ mx: 1 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "250px",
          }}
        >
          <div>
            <Typography variant="h6">{data.title}</Typography>
            <Typography
              sx={{ fontSize: 12 }}
              color="text.secondary"
              gutterBottom
            >
              {data.description}
            </Typography>
          </div>
          <CardMedia
            component="img"
            height="150"
            image={data.image}
            alt="Paella dish"
          />
        </CardContent>
      </Paper>
    );
  });

// carousel - end

function PricingContent(props) {
  const { mainFeaturedPost, bodyPost, newsPost } = props;

  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyles
          styles={{
            ul: { margin: 0, padding: 0, listStyle: "none" },
          }}
        />
        <CssBaseline />
        <AppBar
          position="static"
          color="inherit"
          // color="inherit"
          elevation={0}
        >
          <Toolbar sx={{ flexWrap: "wrap", justifyContent: "flex-end" }}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, fontWeight: 900 }}
            >
              MeetLof
            </Typography>
            <nav>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                Link1
              </Link>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                Link2
              </Link>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                Link3
              </Link>
            </nav>
            <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
        {/* Hero unit */}
        <Box
          sx={{
            backgroundImage: `url(https://plus.unsplash.com/premium_photo-1661475984104-489f85e9c94f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGRhdGluZ3xlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60)`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            borderRadius: "2rem",
            height: "50vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // justifyContent: "center",
            position: "relative",
            m: 6,
          }}
        >
          <Container
            disableGutters
            maxWidth="sm"
            component="main"
            sx={{
              pt: 8,
              pb: 8,
              fontSize: "15px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              // component="h1"
              // variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{
                fontWeight: 900,
                fontSize: "5em",
                textShadow: "2px 7px 3px #000000",
              }}
            >
              {mainFeaturedPost.title}
            </Typography>
            <Button
              variant="text"
              sx={{
                width: "50%",
                borderRadius: "2rem",
                fontWeight: 700,
                height: "50px",
                backgroundColor: "black",
                color: "white",
                mb: 2,
              }}
            >
              Create Account
            </Button>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              component="p"
              sx={{
                textShadow: "1px 1px 2px #000000",
              }}
            >
              {mainFeaturedPost.description}
            </Typography>
          </Container>

          {/* End hero unit */}

          <Container maxWidth="md" component="main">
            <Grid container spacing={3} alignItems="flex-end">
              {bodyPost.map((data, idx) => (
                // {tiers.map((tier) => (
                // Enterprise card is full width at sm breakpoint
                <Grid item key={idx} xs={12} sm={6}>
                  {/* <Grid item key={idx} xs={12} sm={idx % 2 === 0 ? 12 : 6} md={6}> */}
                  <Paper elevation={12} sx={{ borderRadius: "1rem", mx: 1 }}>
                    <Card sx={{ borderRadius: "1rem" }}>
                      <CardHeader
                        title={data.title}
                        // subheader={tier.subheader}
                        titleTypographyProps={{ align: "center" }}
                        // action={tier.title === "Pro" ? <StarIcon /> : null}
                        subheaderTypographyProps={{
                          align: "center",
                        }}
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                              ? theme.palette.grey[200]
                              : theme.palette.grey[800],
                        }}
                      />
                      <CardContent
                        sx={{
                          backgroundImage: `url(${data.image})`,
                          backgroundPosition: "center center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "baseline",
                            mb: 2,
                            height: "100px",
                          }}
                        >
                          {/* <Typography
                            component="h2"
                            variant="h3"
                            color="text.primary"
                          >
                            $1000
                          </Typography>
                          <Typography variant="h6" color="text.secondary">
                            /mo
                          </Typography> */}
                        </Box>
                      </CardContent>
                      <CardContent>
                        <Box
                          align="center"
                          // scroll="auto"
                          sx={{ height: "30px", overflow: "scroll" }}
                        >
                          {data.description}
                        </Box>
                      </CardContent>
                      <CardActions>
                        <Button
                          fullWidth
                          variant="outlined"
                          sx={{ borderColor: "white", color: "white" }}
                        >
                          Click
                        </Button>
                      </CardActions>
                    </Card>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>

          <Container
            maxWidth="md"
            sx={{
              pt: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "skyblue",
            }}
          >
            <AliceCarousel
              mouseTracking
              items={newsCards(newsPost)}
              responsive={responsive}
              controlsStrategy="alternate"
            />
          </Container>

          {/* Footer */}
          <Container
            maxWidth="md"
            component="footer"
            sx={{
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              mt: 8,
              py: [3, 6],
            }}
          >
            <Grid container spacing={4} justifyContent="space-evenly">
              {footers.map((footer) => (
                <Grid item xs={6} sm={3} key={footer.title}>
                  <Typography variant="h6" color="text.primary" gutterBottom>
                    {footer.title}
                  </Typography>
                  <ul>
                    {footer.description.map((item) => (
                      <li key={item}>
                        <Link
                          href="#"
                          variant="subtitle1"
                          color="text.secondary"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Grid>
              ))}
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Container>
          {/* End footer */}
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default function Pricing({ fetchedData }) {
  return <PricingContent {...fetchedData} />;
}
