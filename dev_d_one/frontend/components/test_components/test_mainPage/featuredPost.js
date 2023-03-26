// import { Button } from "@mui/material";
// import Image from "next/image";

// export default function FeaturedPost(props) {
//   const { title, description, image } = props;

//   const overlayTxt = () => (
//     <div
//       style={{
//         position: "absolute",

//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         width: "550px",
//         height: "100%",
//         color: "white",
//         fontWeight: "600",
//         fontSize: "38px",
//       }}
//     >
//       <div style={{ marginBottom: "2rem", textAlign: "center" }}>
//         {description}
//       </div>
//       <Button variant="contained">Join Today</Button>
//     </div>
//   );

//   return (
//     <section
//       style={{
//         position: "relative",
//         width: "100%",
//         height: "500px",
//         overflow: "hidden",
//         // display:'flex',
//         // justifyContent:'center'
//       }}
//     >
//       <div style={{ display: "flex", justifyContent: "center" }}>
//       <Image
//         src="/images/logo_white.png"
//         height={100}
//         width={49}
//         alt="Your Name"
//         style={{position: 'absolute', top:'30px', left:'30px'}}
//       />
//         {overlayTxt()}
//       </div>
//       <img
//         style={{ width: "100%", objectFit: "cover", objectPosition: "top" }}
//         src={image}
//       />
//     </section>
//   );
// }
