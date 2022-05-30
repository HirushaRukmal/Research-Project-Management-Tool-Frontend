
// ** create-user.component.js ** //
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
export default class CreateSubType extends Component {
    constructor(props) {
        super(props)
        this.onChangeSubmission_topic = this.onChangeSubmission_topic.bind(this);
        this.onChangeDeadline = this.onChangeDeadline.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            topic: '',
            deadline: '',
            descrpition: ''
        }
    }
    onChangeSubmission_topic(e) {
        this.setState({ topic: e.target.value })
    }
    onChangeDeadline(e) {
        this.setState({ deadline: e.target.value })
    }
    onChangeDescription(e) {
        this.setState({ description: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()
        const fileObject = {
            topic: this.state.topic,
            deadline: this.state.deadline,
            descrpition: this.state.descrpition
        };
        axios.post('http://localhost:8000/admin/create-submission', fileObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
        this.setState({ topic: '', deadline: '', descrpition: '' })
    }

    render() {
        return (
            <div className="wrapper">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Submission Topic</label>
                        <input type="text" value={this.state.topic} onChange={this.onChangeSubmission_topic} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Deadline</label>
                        <input type="date" value={this.state.deadline} onChange={this.onChangeDeadline} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" value={this.state.description} onChange={this.onChangeDescription} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-success btn-block" />
                    </div>
                </form>
            </div>
        )
    }
}