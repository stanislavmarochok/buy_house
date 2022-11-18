import React, { Component } from 'react';
import { Form, Button,Row, FormGroup, Input, Label, Col,  FormText} from 'reactstrap';


export class SignUp extends Component {
  static displayName = SignUp.name;

  constructor(props){
    super(props);
    this.state = {
        response : false
    };
  }
 
  handleSubmit = async () => {
    const _name = document.getElementById("name").value;
    const _email = document.getElementById("email").value;
    const _password = document.getElementById("password").value;
    const _telephone = document.getElementById("telephone").value;

    const method = "post";
    const headers = {'Content-Type':'application/json'};
    const _body = {
        name : _name,
        email : _email,
        password : _password,
        telephone : _telephone
    };

    const response = await fetch('api/users', {
        method : method,
        headers: headers,
        body: JSON.stringify(_body)
    });
    const data = await response.json();
    console.log(data);
    this.setState({ response : data });
  }

  render() {
    return (
      <div>
        <Form className="form-signUp form">
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for="name"> User Name </Label>
                <Input id="name" name="name" placeholder="Title for your ad" type="text" />
              </FormGroup>
            </Col>
            
          </Row>
          <Row>
          <Col md={12}>
              <FormGroup>
                <Label for="email"> Email </Label>
                <Input id="email" name="email" placeholder="Enter email" type="email" required/>
              </FormGroup>
            </Col>
          </Row>
          <Row>
          <Col md={12}>
              <FormGroup>
                <Label for="password"> Password </Label>
                <Input id="password" name="password" placeholder="Enter password" type="password" required/>
              </FormGroup>
            </Col>
          </Row>
          <Row>
          <Col md={12}>
              <FormGroup>
                <Label for="telephone"> Telephone </Label>
                <Input id="telephone" name="telephone" placeholder="Enter telephone number" type="tel" required/>
              </FormGroup>
            </Col>
          </Row>
          
          
          <Button color="primary" onClick={this.handleSubmit}>Sign Up</Button>
        </Form>
      </div>
    );
  }
}
