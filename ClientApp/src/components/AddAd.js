import React, { Component } from 'react';
import { Form, Button,Row, FormGroup, Input, Label, Col,  FormText} from 'reactstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

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

  handleSubmit = () => {
    const _title = document.getElementById("title").value;
    const _price = document.getElementById("price").value;
    const _address = document.getElementById("exampleAddress").value;
    const _image = this.state.image;
    const _description = document.getElementById("exampleText").value;

    const formData = new FormData();
    formData.append("title", _title);
    formData.append("price", _price);
    formData.append("address", _address);
    formData.append("image", _image);
    formData.append("description", _description);

    const url = `api/items`;

    try {
      const res = axios.post(url, formData);
      console.log(res);
      this.setState({ response : res });
    } catch (ex) {
      console.log(ex.response.data);
    }
  }

  notify = () => toast("TSOI ZIV");

  saveFile = (e) => {
    console.log(e.target.files[0]);
    this.setState({ image: e.target.files[0] });
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
            <Input id="exampleFile" name="file" type="file" onChange={this.saveFile} />
            <FormText> Here image for your ad. Only jpg, png</FormText>
          </FormGroup>
          <FormGroup>
            <Label for="exampleText"> Text Area </Label>
            <Input id="exampleText" name="text" type="textarea" style={{height: "110px"}} placeholder="Description"/>
          </FormGroup>
          
          
          <Button onClick={this.handleSubmit}> Create new ad</Button>
          <Button onClick={this.notify}> Create notification</Button>
        </Form>

        {/* <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button> */}
      </div>
    );
  }
}
