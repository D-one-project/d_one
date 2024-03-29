// import { api } from "../waitList/index";
import Link from "next/link";
import { api } from "../../components/api_axios";

// import Router from "next/router";

waitListPage.getInitialProps = async (ctx) => {
  console.log("getInitialProps - query:", ctx.query);
  const { waitListId } = ctx.query;
  // try {
  const { data } = await api.get(`/apiv01/emailView/${waitListId}/`);
  const { email } = data;
  return { waitListId, email };
  // } catch (e) {
  //   console.log("hah.a..");
  // }
};

export default function waitListPage(props) {
  const { email } = props;

  return (
    <div
      style={{
        // margin: "2rem",
        padding: "10rem",
        height: "100vh",
        color: "white",
        backgroundImage:
          "url('https://d-one.s3.us-west-2.amazonaws.com/LandingPage/static/img/waitlist_background.png')",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "3rem",
        }}
      >
        <img src="https://d-one.s3.us-west-2.amazonaws.com/LandingPage/static/img/Meetlof_logo.png" />
      </div>
      <h1>"{email}" now in the waitlist.</h1>
      <h4 style={{ fontWeight: 300, fontSize: "25px" }}>
        Thank you for joining our waitlist! We can't wait to show you all the
        features. As soon as our service gets online, we'll send you an email to
        let you know, so keep an eye on your inbox. In the meantime, stay tuned
        for updates and get ready to experience all the exciting new features
        and benefits we have in the works. Thank you for your interest and
        support, and we look forward to having you as a part of our community!
      </h4>

      <Link href="/waitList/" style={{ textDecoration: "none", color: "grey" }}>
        <h3>Back to waitlist page</h3>
      </Link>
    </div>
  );
}
