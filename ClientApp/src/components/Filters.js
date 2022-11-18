import React, { useState, Component } from 'react';
import { Collapse, Button, CardBody, Card, Input } from 'reactstrap';

class Filters extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <React.StrictMode>
        <Button color="primary" style={{ width: "100%"}} className="filters-collapse-button"> Filters </Button>
        <Collapse isOpen={true} style={{ marginBottom: '1rem' }} className="filtersFile">
          <div className='filter-body'>
            <CardBody>
              <div className='filterLines'>
                  <div className='filterLine'>Sort by price:
                      <Input id="filter-priceMin" type="number" placeholder='min' min={0} />
                      <Input id="filter-priceMax" type="number" placeholder='max' max={0} />
                  </div>
  
                  <div className='filterLine'>City:
                      <Input id="filter-location" name="select" type="select">
                          <option> Dnipro </option>
                          <option> Kiyv </option>
                          <option> Hmelnickiy </option>
                          <option> Chernihov </option>
                      </Input>
                  </div>
  
                  <div className='filterLine'>
                      <Input id="filter-title" type="text" placeholder="Search by title" style={{width: "100%"}}> </Input>
                  </div>
              </div>
  
              <Button onClick={this.props.applyFilters} color="danger" className='button'>GO <span>AHEAD!</span></Button>
            </CardBody>
          </div>
        </Collapse>
      </React.StrictMode>
    );
  }
}

export default Filters;