import React, { Component } from 'react';
import Filters  from './Filters';
import './home.css';
import { Cards } from './Cards';
import toast from 'react-hot-toast';
import ReactPaginate from 'react-paginate';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props){
    super(props);
    this.state = { 
      items: [],
      itemsPerPage: 5,
      page: 0,
      pagesCount: 0
    };
  }

  componentDidMount(){
    this.fetchItems();
  }

  handlePageClick = (event) => {
    this.fetchItems(event.selected);
  };

  render () {
    if(!this.state || !this.state.items){
      return;
    }

    const pageCount = this.state.page;

    return (
      <main>
        <Filters applyFilters={this.fetchItems} />
        <Cards data={this.state.items} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={this.handlePageClick}
          pageRangeDisplayed={5}
          pageCount={this.state.pagesCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      </main>
    );
  }

  fetchItems = async (pageIdx = null) => {
    const priceMin = document.getElementById("filter-priceMin").value;
    const priceMax = document.getElementById("filter-priceMax").value;
    const location = document.getElementById("filter-location").value;
    const title    = document.getElementById("filter-title").value;
    const itemsPerPage = this.state.itemsPerPage;
    const page = pageIdx == null ? this.state.page : pageIdx;

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
    _body["itemsPerPage"] = itemsPerPage;
    _body["page"] = page;

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
      this.setState({ 
        items : data.responseBody.items,
        pagesCount : data.responseBody.pagesCount, 
        page : pageIdx == null ? this.state.page : pageIdx });
      toast.success('Data loaded');
    })
    .catch(function() {
      toast.error('Data not loaded, some error occured!');
    });
  }
}
