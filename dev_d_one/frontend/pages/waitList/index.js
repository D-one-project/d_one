import * as React from "react";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

// export const api = axios.create({ baseURL: "http://localhost:8000" });
export const api = axios.create({ baseURL: process.env.BACKEND_URL });
// console.log("api:", api);

const loadDB = async () => {
  const emailApi = await api.get("/api/emailView/");
  console.log("LoadDB (emailApi.data):", emailApi.data);
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

// ================================================================================

export default function WaitList(props) {
  const [email, setEmail] = useState("");
  const [emailList, setEmailList] = useState(props.emailData);
  // console.log("emailList: ", emailList);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("handleSubmit Clicked");
    console.log("**email : ", email);

    try {
      await api.post("/api/emailView/", { email: email });
      const loadedData = await loadDB();
      setEmailList(loadedData);
      setEmail("");
    } catch (error) {
      console.log("Duplicated Email or no Email input");
      console.log("error:", error.response);
      // console.log(error);
    }
  };

  const handleInputChange = (e) => {
    console.log("handleInputChange - e.target.value:", e.target.value);
    setEmail(e.target.value);
  };

  const handleClickDelete = async (id) => {
    console.log("handleClickDelete Clicked");
    console.log("id: ", id);
    // try {
    await api.delete(`/api/emailView/${id}/`);
    // } catch (e) {
    //   console.log("error");
    // }
    const loadedData = await loadDB();
    setEmailList(loadedData);
  };

  // Components ==========================================

  const emailListItems = (emailList) =>
    emailList.map((data) => {
      return (
        <li key={data.id}>
          <button onClick={() => handleClickDelete(data.id)}>X</button>
          <Link href={`/waitList/${data.id}`}>
            {data.email} // <b>(id:){data.id}</b>
          </Link>
        </li>
      );
    });

  return (
    <div
      style={{
        margin: "2rem",
      }}
    >
      <h1>Wait-list</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="emailInput"
          value={email}
          onChange={handleInputChange}
        />
        <button type="submit">
          <b>Count me in!</b>
        </button>
      </form>
      <h2>Input email address to be in the wait-list.</h2>
      <h5>Below list is temporarily shown to see if REST api works with DB</h5>
      <div>{emailListItems(emailList)}</div>
    </div>
  );
}
