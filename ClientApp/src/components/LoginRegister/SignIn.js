import React, { Component } from 'react';
import { Form, Button,Row, FormGroup, Input, Label, Col,  FormText} from 'reactstrap';


export class SignIn extends Component {
  static displayName = SignIn.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  render() {
    return (
      <div>
        <Form className="form-signIn form">
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for="userName"> UserName </Label>
                <Input id="userName" name="userName" placeholder="Enter your username" type="text" required/>
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
          
          <Button color="primary"> Sign In</Button>
        </Form>

        {/* <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button> */}
      </div>
    );
  }
}
