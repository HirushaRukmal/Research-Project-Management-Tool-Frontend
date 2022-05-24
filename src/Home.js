import React, { useEffect } from 'react';
require('dotenv').config();
import axios from 'axios';

const Home = () => {

    useEffect(() => {
        axios.get("https://research-tool-backend.azurewebsites.net/student/", {
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    return (
        <h1>LOADING...</h1>
    )
};

export default Home;