import React, { Component } from 'react';

import './home.css';
import { Button} from 'reactstrap';
import "./myAd.css";

export class MyAds extends Component {
  static displayName = MyAds.name;

  constructor(props){
    super(props);
    this.state = {
      items : [],
      authenticatedUserId : sessionStorage.getItem("authenticatedUserId")
    };

    this.fetchItems();
  }

  render () {
    if (!this.state.authenticatedUserId){
      return <h2>You must sign in to see your ads.</h2>;
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

  fetchItems = async () => {
    if (!this.state.authenticatedUserId){
        return;
    }

    const method = "get";
    const headers = {'Content-Type':'application/json'};

    const response = await fetch(`api/items/user/${authenticatedUserId}`, {
      method: method,
      headers: headers
    });
    const data = await response.json();
    console.log(data);
    this.setState({ items : data });
  }
}
