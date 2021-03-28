import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error: any) {
    this.setState({
      error,
    });
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div>
          <h2>Whoops, something went wrong.</h2>
          <h3>{error && error.toString()}</h3>
        </div>
      );
    }
    return this.props.children;
  }
}
