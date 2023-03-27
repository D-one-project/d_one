// import { api } from "../waitList/index";
import Link from "next/link";
import { api } from "../../components/api_axios";

waitListPage.getInitialProps = async (ctx) => {
  console.log("getInitialProps - query:", ctx.query);
  const { signedUpId } = ctx.query;
  const { data } = await api.get(`/apiv01/userView/${signedUpId}/`);
  const { email } = data;
  return { signedUpId, email };
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
      <h1>"{email}" has been registered!!</h1>
      <h4 style={{ fontWeight: 300, fontSize: "25px" }}>
        Thank you for registering with us! We're excited to have you as a part
        of our community. We've just sent you an email with a verification link
        - simply click on the link to confirm your email and complete your
        registration. Once you've completed the verification process, you'll
        have access to all the beta version of our service. Thank you for your
        interest and support, and we look forward to having you as a valued
        member of our community.
      </h4>

      <Link href="/waitList/" style={{ textDecoration: "none", color: "grey" }}>
        <h3>Back to waitlist page</h3>
      </Link>
    </div>
  );
}