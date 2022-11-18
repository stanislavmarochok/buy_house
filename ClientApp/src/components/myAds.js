import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

import './home.css';
import { CardGroup, Card, CardImg, CardBody, CardLink, CardTitle, CardSubtitle, CardText, Button, Navbar, NavbarBrand} from 'reactstrap';
import { EditPage} from './EditPage';
import "./myAd.css";




export class MyAds extends Component {
  static displayName = MyAds.name;

  constructor(props){
    super(props);
  }
  
  items = [
    {
        id: 0,
        title: 'beutiful house',
        price: '1120$',
        date: "12.05.2006",
        imgLink: "https://picsum.photos/318/180"
    },
    {
        id: 1,
        title: 'middle house',
        price: '1120$',
        date: "12.05.2006",
        imgLink: "https://picsum.photos/318/180"


    },
    {
        id: 2,
        title: 'good house',
        price: '1120$',
        date: "12.05.2006",
        imgLink: "https://picsum.photos/318/180"


    },
    {
        id: 3,
        title: 'bad house',
        price: '1120$',
        date: "12.05.2006",
        imgLink: "https://picsum.photos/318/180"


    },
    {
        id: 4,
        title: 'the best house',
        price: '1120$',
        date: "12.05.2006",
        imgLink: "https://picsum.photos/318/180"


    }];

  render () {
    const authenticatedUserId = sessionStorage.getItem("authenticatedUserId");
    if (!authenticatedUserId){
        return <h2>You must sign in to see your ads.</h2>
    }

    return (
      <main>
        <div> 
              {
                this.items.map((item, index) => (
                    <table key={`itemMy-${item.id}`} className='itemMyAd'>
                        <tr>
                            <th>{index+1}.</th>
                            <th>{item.title}</th>
                            <th>{item.price}</th>
                            <th>{item.date}</th>
                            <th><img src={item.imgLink}></img></th>
                            <th><Button OnClick={null} color='success' >Edit</Button></th>
                            <th><Button color='danger' >Delete</Button></th>
                        </tr>
                    </table>
                ))
              }
        </div>
      </main>
    );
  }
}
