import React, { Component } from 'react';
import './home.css';
import { CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button} from 'reactstrap';

export class Cards extends Component {
  static displayName = Cards.name;

  constructor(props){
    super(props);
    this.imagePublicDirectory = "images/items";
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
    if(!this.props || !this.props.data){
      return;
    }
    const groups = this.getGroups(this.props.data);
    return (
        <div> {/*here cards */}
            {groups.map((group, groupIndex) => (
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
    );
  }
}
