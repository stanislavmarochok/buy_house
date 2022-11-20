import React, { Component } from 'react';
import Filters  from './Filters';
import './home.css';
import { Cards } from './Cards';
import toast from 'react-hot-toast';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props){
    super(props);
    this.state = { 
      items: []
    };
  }

  componentDidMount(){
    this.fetchItems();
  }

  render () {
    if(!this.state || !this.state.items){
      return;
    }
    return (
      <main>
        <Filters applyFilters={this.fetchItems} />
        
        <Cards data={this.state.items} />
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

    const response = await fetch(url, {
      method: method,
      headers: headers
    })
    .then(function(response) {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      this.setState({ items : data });
      toast.success('Data loaded');
    })
    .catch(function() {
      toast.error('Data not loaded, some error occured!');
    });
  }
}
