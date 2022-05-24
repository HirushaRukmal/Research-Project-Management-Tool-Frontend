import React from 'react';
require('dotenv').config();

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <h1>{process.env.BACKEND_API}</h1>;
    }
}
