import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";

import User from "./containers/User";
import Welcome from "./containers/Welcome";

// import Posts from "./containers/Posts";
const Posts = React.lazy(() => import("./containers/Posts")); // only default exports are supported

class App extends Component {
  state = { showPosts: false };

  modeHandler = () => {
    this.setState(prevState => {
      return { showPosts: !prevState.showPosts };
    });
  };
  render() {
    return (
      <React.Fragment>
        <button onClick={this.modeHandler}>Toggle Mode</button>;
        {this.state.showPosts ? (
          <Suspense fallback={<div>Loading...</div>}>
            <Posts />
          </Suspense>
        ) : (
          <User />
        )}
      </React.Fragment>
    );
  }
}
// Note:
// Of course one thing to keep in mind is that
// the benefit you will get out of this will be greater if you
// have larger chunks of data behind your components.
// If you have very simple components using suspends
// might actually be overkill and could even slow down
// your application or be suboptimal.

export default App;
