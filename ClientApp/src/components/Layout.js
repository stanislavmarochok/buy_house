import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import Footer from './Footer';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu setUser={this.props.setUser} user={this.props.user} />
        <Container style={{minHeight: "60vh"}}>
          {this.props.children}
        </Container>
        <Footer />
      </div>
    );
  }
}
