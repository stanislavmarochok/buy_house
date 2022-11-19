import React, { useState, Component } from 'react';
import { Collapse, Button, CardBody, Card, Input } from 'reactstrap';
import './css/Filters.css';

class Filters extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
        <div className='filter-body'>
          <CardBody>
            <div className='filterLines'>
                <div className='filterLine'>Sort by price:
                    <Input id="filter-priceMin" type="number" placeholder='min' min={0} />
                    <Input id="filter-priceMax" type="number" placeholder='max' max={0} />
                </div>

                <div className='filterLine'>City:
                    <Input id="filter-location" name="select" type="select">
                        <option></option>
                        <option> Dnipro </option>
                        <option> Kyiv </option>
                        <option> Hmelnickiy </option>
                        <option> Chernihov </option>
                    </Input>
                </div>

                <div className='filterLine'>
                    <Input id="filter-title" type="text" placeholder="Search by title" style={{width: "100%"}} />
                </div>
            </div>

            <Button onClick={this.props.applyFilters} color="danger" className='button'>Apply <span>filters</span></Button>
          </CardBody>
        </div>
    );
  }
}

export default Filters;