import React, { Component } from 'react';
import Filters  from './Filters';
import './home.css';
import { CardGroup, Card, CardImg, CardBody, CardLink, CardTitle, CardSubtitle, CardText, Button, Navbar, NavbarBrand} from 'reactstrap';




export class Home extends Component {
  static displayName = Home.name;

  constructor(props){
    super(props);
    this.state = {groups: this.getGroups()};
  }
  
  getGroups() {
    let items = [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5}];
    let groupsCount = parseInt(Math.floor(items.length / 3));

    const _groups = [];
    for (let i = 0; i <= groupsCount; i++) {
      const _items = [];
      for(let j = 0; j < 3; j++){
        let index = i * 3 + j;
        if(index >= items.length){
          break;
        }else{
          _items.push(items[index]);
        }
      }
      _groups.push(_items);
    }
    return _groups;
  }

 
  


  render () {
    if(!this.state || !this.state.groups){
      return;
    }
    return (

      <main>
        <Filters/>
        
        
        
        
        <div> {/*here cards */}
              {this.state.groups.map((group, groupIndex) => (
                  <CardGroup key={`cardGroup-${groupIndex}`}>
                    {group.map((card, cardIndex) => 
                      <Card key={`cardgroup-${groupIndex}-card-${cardIndex}`}>
                        <CardImg alt="Card image cap" src="https://picsum.photos/318/180" top width="100%" />
                        <CardBody>
                          <CardTitle tag="h5"> Beautiful house </CardTitle>
                          <CardSubtitle className="mb-3" tag="h6"> Dnipro </CardSubtitle>
                          <CardSubtitle className="mb-2 text-muted" tag="h6"> 1200$ </CardSubtitle>
                          <CardText>
                            This is super mega hyper interesting immosible interesting description
                          </CardText>
                          <Button> Button </Button>
                        </CardBody>
                      </Card>
                    )}
                  </CardGroup>
              ))}


          {/* <CardGroup>
            <Card style={{minWidth: "30% important"}}>
              <CardImg alt="Card image cap" src="https://picsum.photos/318/180" top width="100%" />
              <CardBody>
                <CardTitle tag="h5"> Card title </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6"> Card subtitle </CardSubtitle>
                <CardText>
                  This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                </CardText>
                <Button> Button </Button>
              </CardBody>
            </Card>
            <Card>
              <CardImg alt="Card image cap" src="https://picsum.photos/318/180" top width="100%" />
              <CardBody>
                <CardTitle tag="h5"> Card title </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6"> Card subtitle </CardSubtitle>
                <CardText>
                  This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                </CardText>
                <Button> Button </Button>
              </CardBody>
            </Card>
            <Card>
              <CardImg alt="Card image cap" src="https://picsum.photos/318/180" top width="100%" />
              <CardBody>
                <CardTitle tag="h5"> Card title </CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6"> Card subtitle </CardSubtitle>
                <CardText>
                  This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                </CardText>
                <Button> Button </Button>
              </CardBody>
            </Card>
          </CardGroup> */}
        </div>
      </main>
    );
  }

  
}
