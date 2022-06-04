import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useParams } from "react-router-dom";
export default class EditSubType extends Component {
  constructor(props) {
    super(props)
    this.onChangeSubmissionTopic = this.onChangeSubmissionTopic.bind(this);
    this.onChangeDeadline = this.onChangeDeadline.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // State
    this.state = {
      Submission_Topic: '',
      Deadline: '',
      Description: ''
    }
  }
  componentDidMount() {
    axios.get('http://localhost:8000/admin/edit-submission/' + this.props.match.params._id)
      .then(res => {
        this.setState({
          Submission_Topic: res.data.Submission_Topic,
          Deadline: res.data.Deadline,
          Description: res.data.Description
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  onChangeSubmissionTopic(e) {
    this.setState({ Submission_Topic: e.target.value })
  }
  onChangeDeadline(e) {
    this.setState({ Deadline: e.target.value })
  }
  onChangeDescription(e) {
    this.setState({ Description: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()
    const submissionObject = {
      Submission_Topic: this.state.Submission_Topic,
      Deadline: this.state.Deadline,
      Description: this.state.Description
    };
    axios.put('http://localhost:8000/admin/update-submission/' + this.props.match.params._id, submissionObject)
      .then((res) => {
        console.log(res.data)
        console.log('Submission Type successfully updated')
      }).catch((error) => {
        console.log(error)
      })
    // Redirect to Student List 
    this.props.history.push('/list_subTypes')
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Topic">
          <Form.Label>Submission Topic</Form.Label>
          <Form.Control type="text" value={this.state.Submission_Topic} onChange={this.onChangeSubmissionTopic} />
        </Form.Group>
        <Form.Group controlId="deadline">
          <Form.Label>Deadline</Form.Label>
          <Form.Control type="date" value={this.state.Deadline} onChange={this.onChangeDeadline} />
        </Form.Group>
        <Form.Group controlId="Desc">
          <Form.Label>Decription</Form.Label>
          <Form.Control type="text" value={this.state.Description} onChange={this.onChangeDescription} />
        </Form.Group>
        <Button variant="danger" size="lg" block="block" type="submit">
          Update
        </Button>
      </Form>
    </div>);
  }
}