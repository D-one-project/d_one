import Link from "next/link";
import { Button, Divider, Typography } from "@mui/material";
import Image from "next/image";

const sections = [
  { title: "Mobile App", url: "/" },
  { title: "About", url: "/" },
  { title: "Community", url: "/" },
  { title: "Support", url: "/" },
  { title: "News", url: "/" },
  { title: "Resources", url: "/" },
];

const footerMenu = (start, end) => {
  const tempArr = [];
  for (let i = start; i <= end; i++) {
    tempArr.push(
      <Link key={i} href={sections[i].url} style={{ textDecoration: "none" }}>
        <Button sx={{ color: "black", fontSize: "12px", margin: "3rem" }}>
          {sections[i].title}
        </Button>
      </Link>
    );
  }
  return tempArr;
};

export default function Footer() {
  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ paddingLeft: "2rem" }}>{footerMenu(0, 2)}</div>
        <div>
          <Image
            src="/images/logo_black.png"
            height={90}
            width={70}
            alt="Your Name"
          />
        </div>
        <div style={{ paddingRight: "2rem" }}>{footerMenu(3, 5)}</div>
      </div>
      <Divider />
      <Typography sx={{ fontSize: "15px" }} marginTop='1rem' align="center">
        © D1, Inc. 2022. the first dating game app
      </Typography>
    </div>
  );
}
