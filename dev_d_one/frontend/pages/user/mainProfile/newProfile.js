import { useEffect, useState } from "react";
// import { fetchData } from "../../../utils/fetchData";
import { api } from "../../../components/api_axios";
import React from 'react';

import { Button, TextField } from "@mui/material/";
import { PropaneSharp } from "@mui/icons-material";
// import Grid from "@mui/material/Grid";

export default function NewProfileComponent(props) {

    //user id passed from the parent component
    console.log('props:', props)
    console.log('props: ', props.data.id )
    
    
    // the userdata below is only works within this component, it's different from the user in the parent component; [profile].js
    const [userdata, setdata] = useState(
        {
            firstName: '',
            lastName: '',
            city: '',
            state: '',
            status: '',
            gender: '',
            bio: '',
            interest: '',
        }
    );



    const dataSetFormatLeft = [
        // { name: "email", selectFiled: false, variant: "standard" },
        { name: "firstName", selectFiled: false, variant: "standard" },
        { name: "lastName", selectFiled: false, variant: "standard" },
        { name: "city", selectFiled: false, variant: "standard" },
        { name: "state", selectFiled: false, variant: "standard" },
        { name: "status", selectFiled: true, variant: "filled" },
        { name: "gender", selectFiled: true, variant: "filled" },
        { name: "bio", label: "up to 50 words" },
        { name: "interest", label: "up to 100 words" },
    ];


    const profileComponentsLeft = () =>
        dataSetFormatLeft.map((data, idx) => {
            return (
                <TextField
                    margin='normal'
                    key={idx}
                    required
                    fullWidth
                    label={data.name.toUpperCase()}
                    id={data.name}
                    autoComplete="new-password"
                    onChange={(res) => handleDataOnChange(res)}
                    value={userdata[data.name]}
                    variant={data.variant}
                />
            );
        });

    const handleDataOnChange = (res) => {
        console.log(`입력된값(${res.target.id}):`, res.target.value);
        setdata({
            ...userdata, //To match the userdata value format
            [res.target.id]: res.target.value
        })
    }

    const handleOnSubmitBtn = () => {
        console.log('버튼 클릭');
        console.log('Userdata In userState():', userdata);
        sendEditProfile();

    }

    // 여기서 ... fistname, lastname 등 기본정보들 put or patch 연결!!.. post를 해야하나? 첫 데이터니까?
    async function sendEditProfile() {
        const tokenSet = JSON.parse(localStorage.getItem('tokenSet'));
        const options = {
            headers: { Authorization: `Token ${tokenSet.token}` },
        };

        const { city, state, status, gender, bio, interest } = userdata;
        const updatedData = { city, state, status, gender, bio, interest, user: props.data.id };

        console.log('updatedData: ', updatedData);
        // console.log('token user id:', tokenSet.user_id)

        await api.post(`/apiv01/userProfileView/`, updatedData, options).then(res => {
            console.log('data has been sent');
            console.log(updatedData);
            // router.push(`/user/mainProfile/`);
            props.loadData();
        })

    }

    return (
        <div style={{ width: '35%' }}>
            <h1>WELCOME :)</h1>
            <h1>Tell us about yourself first!</h1>
            {profileComponentsLeft()}
            <Button
                sx={{
                    marginTop: "1rem",
                    borderRadius: "2rem",
                    color: "black",
                    width: "100%",
                    height: "50px",
                }}
                variant="contained"
                size="large"
                color="success"
                onClick={handleOnSubmitBtn}
            >
                Submit
            </Button>
        </div>
    )
}