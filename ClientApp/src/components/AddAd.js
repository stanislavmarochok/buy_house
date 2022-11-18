import React, { Component } from 'react';
import { Form, Button,Row, FormGroup, Input, Label, Col,  FormText} from 'reactstrap';


export class AddAd extends Component {
  static displayName = AddAd.name;

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
        <Form className="form-addAd form">
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for="title"> Title </Label>
                <Input id="title" name="title" placeholder="Title for your ad" type="text" />
              </FormGroup>
            </Col>
            
          </Row>
          <Row>
          <Col md={12}>
              <FormGroup>
                <Label for="price"> Price </Label>
                <Input id="price" name="price" placeholder="Price" type="number" required/>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="exampleAddress"> City </Label>
            <Input id="exampleAddress" name="address" placeholder="Enter city" type="select">
              <option>Dnipro</option>
              <option>Kiyv</option>
              <option>Chernivci</option>
              <option>Hmelnickiy</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleFile"> Image </Label>
            <Input id="exampleFile" name="file" type="file" />
            <FormText> Here image for your ad. Only jpg, png</FormText>
          </FormGroup>
          <FormGroup>
            <Label for="exampleText"> Text Area </Label>
            <Input id="exampleText" name="text" type="textarea" style={{height: "110px"}} placeholder="Description"/>
          </FormGroup>
          
          
          <Button> Create new ad</Button>
        </Form>

        {/* <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button> */}
      </div>
    );
  }
}
