import React, { Component } from 'react';
import { Form, Button,Row, FormGroup, Input, Label, Col} from 'reactstrap';


export class SignIn extends Component {
  static displayName = SignIn.name;

  constructor(props) {
    super(props);
    this.state = { 
        currentCount: 0,
        response : false 
    };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  handleSubmit = async () => {
    const _email = document.getElementById("email").value;
    const _password = document.getElementById("password").value;

    const method = "post";
    const headers = {'Content-Type':'application/json'};
    const _body = {
        email : _email,
        password : _password
    };

    const props = this.props;

    const response = await fetch('api/auth', {
        method : method,
        headers: headers,
        body: JSON.stringify(_body)
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      if (data.responseCode == '200'){
        const user = {
          id: data.responseBody.id,
          email: data.responseBody.email
        }
  
        props.setUser(user);
      }
    });
  }

  render() {
    return (
      <div>
        <Form className="form-signIn form">
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for="email"> UserName </Label>
                <Input id="email" name="email" placeholder="Enter your email" type="text" required/>
              </FormGroup>
            </Col>
            
          </Row>
          <Row>
          <Col md={12}>
              <FormGroup>
                <Label for="password"> Password </Label>
                <Input id="password" name="password" placeholder="Enter your password" type="password" required/>
              </FormGroup>
            </Col>
          </Row>
          
          <Button color="primary" onClick={this.handleSubmit}> Sign In</Button>
        </Form>
      </div>
    );
  }
}
