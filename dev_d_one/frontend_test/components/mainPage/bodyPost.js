import { Box, Grid, Paper, Checkbox } from "@mui/material";

export default function BodyPost(props) {
  const { bodyPost, newsPost } = props;

  const inlineStyle = {
    rootContainer: {
      marginTop: "62px",
      marginLeft: "62px",
      marginRight: "62px",
    },
    textBox: {
      marginLeft: "37px",
      marginRight: "37px",
      width: "50%",
      overflow: "scroll",
    },
    imgBox: {
      width: "50%",

      overflow: "hidden",
      // backgroundColor: "red",
    },
  };

  const bodyBox = () =>
    bodyPost.map((data, idx = 0) => {
      return (
        <Paper key={idx} elevation={1} sx={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              marginBottom: "62px",
              flexFlow: `${idx % 2 === 0 ? "row" : "row-reverse"}`,
              height: "200px",
            }}
          >
            <div style={inlineStyle.textBox}>
              <h4>{data.title}</h4>
              {data.description}
            </div>
            <div style={inlineStyle.imgBox}>
              <img src={data.image} />
            </div>
          </div>
        </Paper>
      );
    });

  // Need to use Form component to submit data
  const newsBox = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h4>NEWS</h4>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {newsPost.map((data, idx) => (
              <Grid item xs={4} key={idx}>
                <Paper
                  elevation={1}
                  sx={{ padding: "8px", textAlign: "center" }}
                >
                  <img src={data.image} style={{ width: "100%" }} />
                  {data.title}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    );
  };

  const newsLetter = () => (
    <Box
      sx={{
        marginTop: "1rem",
        width: "100%",
        backgroundColor: "#F5F5F5",
        fontWeight: "400",
        fontSize: "36px",
        padding: "54px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <div>Hear it here first! </div>
        <div>Sign up for the D1 newsletter. </div>
      </div>
      <Box
        sx={{
          width: "60%",
          height: "160px",
          backgroundColor: "white",
          border: "solid",
          borderColor: "#18A0FB",
          color: "#18A0FB",
          padding: "1rem",
          fontSize: "18px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>Email: </span>
          <span>Date of Birth: </span>
          <br></br>
          <span>
            <Checkbox
              sx={{
                height: "10px",
                color: "#18A0FB",
                "&.Mui-checked": {
                  color: "#18A0FB",
                },
              }}
            />
            I agree to the collection and use of my personal information.
            Details
          </span>
          <span>
            <Checkbox
              sx={{
                height: "10px",
                color: "#18A0FB",
                "&.Mui-checked": {
                  color: "#18A0FB",
                },
              }}
            />
            I agree to receive newsletters on the latest events, notices, and
            updates on D1
          </span>
        </div>
      </Box>
    </Box>
  );

  return (
    <section style={inlineStyle.rootContainer}>
      {bodyBox()}
      {newsBox()}
      {newsLetter()}
    </section>
  );
}
