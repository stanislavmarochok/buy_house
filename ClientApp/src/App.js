import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { MyAds } from './components/MyAds';
import { AddAd } from './components/AddAd';
import { SignIn } from './components/LoginRegister/SignIn';
import { SignUp } from './components/LoginRegister/SignUp';


import './custom.css'

export default class App extends Component {
  static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
          user: "asdf"
        };
    }

  render () {
    return (
      <Layout setUser={this.setUser} user={this.state.user}>
        <Route exact path='/' component={Home} />
        <Route path='/addAd' component={AddAd} />
        <Route path='/myAds' component={MyAds} />
        <Route path='/signIn' render={(props) => <SignIn user="asfdjk" setUser={this.setUser} {...props} />} />
        <Route path='/signUp' component={SignUp} />
      </Layout>
    );
    }

    LoadAllItems = async () => {
        const response = await fetch('/api/items');
        const data = await response.json();
        this.setState({ items: data, loading: false });
    }

    setUser = (user) => {
      this.setState({ user: user });
    }
}
