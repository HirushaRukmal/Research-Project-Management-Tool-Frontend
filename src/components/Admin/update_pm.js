import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
export default class EditPm extends Component {
  constructor(props) {
    super(props)
    this.onChangePmName = this.onChangePmName.bind(this);
    this.onChangePmEmail = this.onChangePmEmail.bind(this);
    this.onChangeGroupName = this.onChangeGroupName.bind(this);
    this.onChangeGroupEmail = this.onChangeGroupEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // State
    this.state = {
        Panel_Member_Name: '',
        Panel_Member_Email: '',
        Group_Name: '',
        Group_email: ''
    }
  }
  componentDidMount() {
    axios.get('http://localhost:8000/admin/update-pm/' + this.props.match.params.id)
      .then(res => {
        this.setState({
            Panel_Member_Name: res.data.Panel_Member_Name,
            Panel_Member_Email: res.data.Panel_Member_Email,
            Group_Name: res.data.Group_Name,
            Group_email: res.data.Group_email
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  onChangePmName(e) {
    this.setState({Panel_Member_Name: e.target.value })
  }
  onChangePmEmail(e) {
    this.setState({ Panel_Member_Email: e.target.value })
  }
  onChangeGroupName(e) {
    this.setState({ Group_Name: e.target.value })
  }
  onChangeGroupEmail(e) {
    this.setState({ Group_email: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()
    const submissionObject = {
        Panel_Member_Name: this.state.Panel_Member_Name,
        Panel_Member_Email: this.state.Panel_Member_Email,
        Group_Name: this.state.Group_Name,
        Group_email: this.state.Group_email
    };
    axios.put('http://localhost:8000/admin/edit-pm/' + this.props.match.params.id, submissionObject)
      .then((res) => {
        console.log(res.data)
        console.log(' successfully updated')
      }).catch((error) => {
        console.log(error)
      })
    // Redirect to Student List 
    this.props.history.push('/admin/pmlist')
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