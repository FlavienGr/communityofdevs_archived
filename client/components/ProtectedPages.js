import React, { Component } from 'react';
import Router from 'next/router';
import LoadingPage from './LoadingPage';

export default function(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: false,
        loading: true
      };
    }

    componentDidMount() {
      this.setState(() => ({ user: this.props.currentUser.success }));
      if (!this.props.currentUser.success && this.state.loading) {
        Router.push('/login');
      }
      this.setState(() => ({
        loading: false
      }));
    }

    render() {
      return (
        <>
          {this.state.user && !this.state.loading ? (
            <WrappedComponent {...this.props} />
          ) : (
            <LoadingPage />
          )}
        </>
      );
    }
  };
}
