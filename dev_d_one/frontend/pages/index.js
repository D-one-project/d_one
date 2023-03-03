import * as React from "react";
import axios from "axios";
import { useState } from "react";

const api = axios.create({ baseURL: "http://localhost:8000" });

const loadDB = async () => {
  const emailApi = await api.get("/api/emailView/");
  // console.log("LoadDB (emailApi.data):", emailApi.data);
  return emailApi.data || [];
};

//pre-rendering with data.
export async function getServerSideProps() {
  console.log("inside getServerSideProps");
  const loadedData = await loadDB();

  return {
    props: {
      emailData: loadedData,
    },
  };
}

const emailListItems = (emailList) =>
  emailList.map((data) => {
    return (
      <li key={data.id}>
        {data.email} // <b>(id:){data.id}</b>
      </li>
    );
  });

export default function Index(props) {
  const [email, setEmail] = useState("");
  const [emailList, setEmailList] = useState(props.emailData);
  // console.log("emailList: ", emailList);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("handleSubmit Clicked");
    // console.log(": ", email);

    try {
      const response = await api.post("/api/emailView/", { email: email });
      // console.log("response.data: ", response.data);
      // console.log("emailList: ", emailList);
      const loadedData = await loadDB();
      setEmailList(loadedData);
      setEmail("");
    } catch (error) {
      console.error(error);
      console.error("ERRORRRRRR");
    }
  };

  const handleInputChange = (e) => {
    // console.log("handleInputChange - e.target.value:", e.target.value);
    setEmail(e.target.value);
  };

  return (
    <>
      <h1>Wait-list</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="emailInput"
          value={email}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <div>{emailListItems(emailList)}</div>
    </>
  );
}
