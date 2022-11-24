import React, { Component } from 'react';

import './home.css';
import "./MyAds.css";
import { Button, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export class MyAds extends Component {
  static displayName = MyAds.name;

  constructor(props){
    super(props);
    this.state = {
      items : [],
    };

    this.fetchItems();
  }

  render () {
    if (!this.props.user.id){
      return <h2>You must sign in to see your ads.</h2>;
    }

    if (!this.state.items){
      return;
    }

    return (
      <main>
        <div> 
              {
                this.state.items.map((item, index) => (
                    <table key={`itemMy-${item.id}`} className='itemMyAd'>
                        <tr>
                            <th>{index+1}.</th>
                            <th>{item.title}</th>
                            <th>{item.price}</th>
                            <th>{item.date}</th>
                            <th><img src={item.imgLink}></img></th>
                            <th><NavLink tag={Link} className="text-dark" to={`/items/edit/${item.id}`}>Edit</NavLink></th>
                            <th><Button color='danger' onClick={() => this.deleteItem(item.id)}>Delete</Button></th>
                        </tr>
                    </table>
                ))
              }
        </div>
      </main>
    );
  }

  fetchItems = async () => {
    if (!this.props || !this.props.user || !this.props.user.id){
        return;
    }


    const method = "get";
    const headers = {'Content-Type':'application/json'};

    const response = await fetch(`api/items/user/${this.props.user.id}`, {
      method: method,
      headers: headers
    })
    .then(function(response) {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      this.setState({ 
        items : data
      });
      toast.success('Data loaded');
    })
    .catch(function() {
      toast.error('Data not loaded, some error occured!');
    });;
  }

  deleteItem = async (itemId) => {
    if (!itemId || !this.props.user.id){
        return;
    }

    const method = "delete";
    const headers = {'Content-Type':'application/json'};

    const response = await fetch(`api/items/${itemId}`, {
      method: method,
      headers: headers
    });
    const data = await response.json();

    this.fetchItems();
  }
}
