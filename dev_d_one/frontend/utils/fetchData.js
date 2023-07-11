import { api } from "../components/api_axios";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

export async function fetchData() {
    // const [userdata, setdata] = useState("");
    // const [loading, setLoading] = useState(true);
    const tokenSet = JSON.parse(localStorage.getItem('tokenSet'));
    // The token stored in the 'localStorage' will persist until deleted manually. will need to update this code
    // Also, DRF default token authentication system doesn't have a built-in expiration mechanism.
    // So, this one also need to be improved.
    // console.log('username:', username)
    console.log('tokenSet:', tokenSet)
    console.log('tokenSet:', tokenSet.token)
    console.log('tokenSet:', tokenSet.user_id) // using the id from the token returned when a user logs in.

    const options = {
        headers: { Authorization: `Token ${tokenSet.token}` },
    };

    return await api.get(`/apiv01/userView/${tokenSet.user_id}/`, options)

}