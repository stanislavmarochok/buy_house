import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card, Input } from 'reactstrap';

function Filters(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.StrictMode>
      <Button color="primary" onClick={toggle} style={{ width: "100%"}} className="filters-collapse-button"> Filters </Button>
      <Collapse isOpen={isOpen} {...args} style={{ marginBottom: '1rem' }} className="filtersFile">
        <div className='filter-body'>
          <CardBody>
            <div className='filterLines'>
                <div className='filterLine'>Sort by price:
                    <Input type="number" placeholder='min' min={0}/>
                    <Input type="number" placeholder='max' max={0}/>
                </div>

                <div className='filterLine'>City:
                    <Input id="exampleSelect" name="select" type="select" >
                        <option> Dnipro </option>
                        <option> Kiyv </option>
                        <option> Hmelnickiy </option>
                        <option> Chernihov </option>
                    </Input>
                </div>

                <div className='filterLine'>
                    <Input type="text" placeholder="Search by Name" style={{width: "100%"}}> </Input>
                </div>
            </div>

            <Button color="danger" className='button'>GO <span>AHEAD!</span></Button>
          </CardBody>
        </div>
      </Collapse>
    </React.StrictMode>
  );
}

export default Filters;