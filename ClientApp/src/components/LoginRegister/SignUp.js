import React, { Component } from 'react';
import { Form, Button,Row, FormGroup, Input, Label, Col,  FormText} from 'reactstrap';


export class SignUp extends Component {
  static displayName = SignUp.name;
 

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
          
          
          <Button color="primary">Sign Up</Button>
        </Form>

        {/* <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button> */}
      </div>
    );
  }
}
