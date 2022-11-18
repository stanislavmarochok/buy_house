import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { MyAds } from './components/myAds';
import { AddAd } from './components/AddAd';
import { SignIn } from './components/LoginRegister/SignIn';
import { SignUp } from './components/LoginRegister/SignUp';


import './custom.css'

export default class App extends Component {
  static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true,
        };
    }

    componentDidMount() {
        // this.LoadAllItems();
    }

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/addAd' component={AddAd} />
        <Route path='/myAds' component={MyAds} />
        <Route path='/signIn' component={SignIn} />
        <Route path='/signUp' component={SignUp} />

            <ul>
                {this.state.items.map(item => <li key={`item-${item.id}`}>{item.title}</li>)}
            </ul>
      </Layout>
    );
    }

    LoadAllItems = async () => {
        const response = await fetch('/api/items');
        const data = await response.json();
        this.setState({ items: data, loading: false });
    }
}
