import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { MyAds } from './components/MyAds';
import { AddAd } from './components/AddAd';
import { SignIn } from './components/LoginRegister/SignIn';
import { SignUp } from './components/LoginRegister/SignUp';
import { EditItem } from './components/EditItem';

import './custom.css'
import { Toaster } from 'react-hot-toast';

export default class App extends Component {
  static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
          user: false
        };
    }

  render () {
    return (
      <Layout setUser={this.setUser} user={this.state.user}>
        <Toaster />
        <Route exact path='/' component={Home} />
        <Route path='/addAd' render={(props) => <AddAd user={this.state.user} setUser={this.setUser} {...props} />} />
        <Route path='/myAds' render={(props) => <MyAds user={this.state.user} {...props} />} />
        <Route path='/signIn' render={(props) => <SignIn user="asfdjk" setUser={this.setUser} {...props} />} />
        <Route path='/signUp' component={SignUp} />
        <Route path='/items/edit/:id' component={EditItem} />
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
