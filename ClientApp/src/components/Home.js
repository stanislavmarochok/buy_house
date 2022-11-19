import React, { Component } from 'react';
import Filters  from './Filters';
import './home.css';
import { CardGroup, Card, CardImg, CardBody, CardLink, CardTitle, CardSubtitle, CardText, Button, Navbar, NavbarBrand} from 'reactstrap';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props){
    super(props);
    this.state = { 
      groups: [],
      items: []
    };
    this.imagePublicDirectory = "images/items";
  }

  componentDidMount(){
    this.fetchItems();
  }
  
  getGroups(data) {
    let items = data;
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
        <Filters applyFilters={this.fetchItems} />
        
        <div> {/*here cards */}
          {this.state.groups.map((group, groupIndex) => (
              <CardGroup key={`cardGroup-${groupIndex}`}>
                {group.map((card, cardIndex) => 
                  <Card key={`cardgroup-${groupIndex}-card-${cardIndex}`}>
                    <CardImg alt="Card image cap" src={`${this.imagePublicDirectory}/${card.imageName}`} top width="100%" />
                    <CardBody>
                      <CardTitle tag="h5">{card.title}</CardTitle>
                      <CardSubtitle className="mb-3" tag="h6">{card.address}</CardSubtitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">{`${card.price}$`}</CardSubtitle>
                      <CardText>{card.description}</CardText>
                      <Button> Button </Button>
                    </CardBody>
                  </Card>
                )}
              </CardGroup>
          ))}
        </div>
      </main>
    );
  }

  fetchItems = async () => {
    const priceMin = document.getElementById("filter-priceMin").value;
    const priceMax = document.getElementById("filter-priceMax").value;
    const location = document.getElementById("filter-location").value;
    const title    = document.getElementById("filter-title").value;

    const method = "get";
    const headers = {'Content-Type':'application/json'};

    const _body = {};
    if (priceMin){
      _body["priceMin"] = priceMin;
    }
    if (priceMax){
      _body["priceMax"] = priceMax;
    }
    if (location){
      _body["location"] = location;
    }
    if (title){
      _body["title"] = title;
    }

    var url = new URL('http://localhost:38497/api/items');
    url.search = new URLSearchParams(_body).toString();

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.setState({ items : data, groups : this.getGroups(data) });
  }
}
