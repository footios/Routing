import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";

import User from "./containers/User";
import Welcome from "./containers/Welcome";

// import Posts from "./containers/Posts";
const Posts = React.lazy(() => import("./containers/Posts")); // only default exports are supported

// So if you are using the React 16.6 or higher then you have a new way
// of lazy loading your routes because it adds a new method on the React object.
// The 'React.lazy' method which you can use
// to load your data your components asynchronously.
// Which means only when they are needed.

// By the way whenever you have a use case
// whereas some component is loaded at a later point of time
// for example because you have a check
// and some condition needs to be met to render a certain component
// in all such cases you could use React.lazy.

// Now after reloading clear it and now click on the 'Posts Page'
// and you will see that there it loaded a new file
// and that is the file holding the code for this component
// and that is async rendering and async loading in action
// because this component and its code is only fetched and rendered
// when we really need it and therefore we avoid loading everything in advance
// which can of course drastically improve the performance of your application
// depending on its size.

// See next commit where we don't use a browser router.
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {/* <React.Fragment> does not render a real Dom element 
            and therefore does not distort your dom. */}
        <React.Fragment>
          <nav>
            <NavLink to="/user">User Page</NavLink> |&nbsp;
            <NavLink to="/posts">Posts Page</NavLink>
          </nav>
          <Route path="/" component={Welcome} exact />
          <Route path="/user" component={User} />
          <Route
            path="/posts"
            render={() => (
              // The fallback prop is in case React postpones the rendering
              // of this wrap component and shows a fallback in the meantime.
              <Suspense fallback={<div>Loading...</div>}>
                <Posts />
              </Suspense>
            )}
          />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
