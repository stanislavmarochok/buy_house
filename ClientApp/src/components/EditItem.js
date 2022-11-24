import React, { Component } from 'react';
import axios from 'axios';
import toast, { ToastBar, Toaster } from 'react-hot-toast';
import { Form, Button,Row, FormGroup, Input, Label, Col,  FormText} from 'reactstrap';
import { Cards } from '../components/Cards';


export class EditItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            item: false
        };
    }

    fetchItem = async () => {
        const id = this.props.match.params.id;
        const url = `api/items/${id}`;

        const method = "get";
        const headers = {'Content-Type':'application/json'};

        const response = await fetch(url, {
          method: method,
          headers: headers
        })
        .then(function(response) {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          this.setState({ 
            item : data,
            });
          toast.success('Item loaded successfully!');
        })
        .catch(function() {
          toast.error('Data not loaded, some error occured!');
        });
    }

    updateItem = async () => {
        const id = this.props.match.params.id;

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
    
        const url = `api/items/${id}`;
    
        try {
          const res = await axios.put(url, formData);
          
          if(res.responseCode == "200"){
            toast.success(`Item ${_title} updated succesfully!`);
          }
    
          this.setState({ response : res });
        } catch (ex) {
          console.log(ex.response.data);
        }
    }

    componentDidMount(){
        this.fetchItem();
    }

    render(){
        if (!this.state || !this.state.item)
            return;

        return (
            <div>
            <Toaster />
            <Form className="form-addAd form">
                <Row>
                <Col md={12}>
                    <FormGroup>
                    <Label for="title"> Title </Label>
                    <Input id="title" name="title" placeholder="Title for your ad" type="text" defaultValue={this.state.item.title} />
                    </FormGroup>
                </Col>
                
                </Row>
                <Row>
                <Col md={12}>
                    <FormGroup>
                    <Label for="price"> Price </Label>
                    <Input id="price" name="price" placeholder="Price" type="number" defaultValue={this.state.item.price} required/>
                    </FormGroup>
                </Col>
                </Row>
                <FormGroup>
                <Label for="exampleAddress"> City </Label>
                <Input id="exampleAddress" name="address" placeholder="Enter city" type="select" defaultValue={this.state.item.address}>
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
                <Input id="exampleText" name="text" type="textarea" style={{height: "110px"}} placeholder="Description" defaultValue={this.state.item.description}/>
                </FormGroup>
                
                
                <Button onClick={this.updateItem}> Update your ad</Button>
            </Form>
    
            {/* <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>
    
            <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button> */}
            </div>
        );
    }
}