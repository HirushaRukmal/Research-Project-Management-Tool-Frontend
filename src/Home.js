import React, { useEffect } from 'react';
require('dotenv').config();
import axios from 'axios';

const Home = () => {

    useEffect(() => {
        axios.get(`${process.env.BACKEND_API}/student/`, {
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