import React, { Component } from "react";

const asyncComponent = importComponent => {
  return class extends Component {
    state = { component: null };

    componentDidMount() {
      importComponent().then(cmp => {
        // cmp.default -> is the case due to the set up
        // we're using here with 'create react app'.
        this.setState({ component: cmp.default });
      });
    }
    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
