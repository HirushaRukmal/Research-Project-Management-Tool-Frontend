import React, { useEffect } from 'react';
require('dotenv').config();
import axios from 'axios';

const Home = () => {

    useEffect(() => {
        axios.get(`${process.env.BACKEND_API_HEROKU}/student/`, {
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    return (
        <div>
            <h1>LOADING...</h1>
            <h2>ENV: {process.env.BACKEND_API}</h2>
        </div>
    )
};

export default Home;