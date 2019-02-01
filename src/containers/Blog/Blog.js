import React, { Component } from "react";

import { Route, NavLink, Switch, Redirect } from "react-router-dom";

import "./Blog.css";
import Posts from "./Posts/Posts";
// When ever you are importing something...,
// you basically inform 'webpack',
// (the build tool which gets used behind the scenes)
// about this dependency and it will include it in the global bundle.
// But we don't want that for lazy loading.
// Still 'webpack' needs to be able to dynamically prepare
// some extra bundle for this potentially loaded code.

//import NewPost from "./NewPost/NewPost";
import asyncComponent from "../../hoc/asyncComponent";
const AsyncNewPost = asyncComponent(() => {
  // This (return import(...)) is a special syntax.
  // It's the 'dynamic import syntax' which means
  // whatever comes between the parentheses, is only imported
  // when that function here is executed.
  // And that function here will only be executed once we render
  // AsyncNewPost to the screen.
  return import("./NewPost/NewPost");
});

class Blog extends Component {
  state = {
    auth: true
  };
  // 1.
  // Now, let's go to the 'network' tab in the developer tools.
  // There if I go into posts you see that we're loading this bundle.js file.
  // This contains all our source code, and it's rather big.
  // So loading the entire bundle with all the code of our application up front
  // can be bad if we have a big application with distinct features
  // and distinct areas in the app where a user might never visit a certain area.
  // E.g. in our app, loading NewPost could be redundant.
  // It should only be loaded if the user actually navigates to NewPost.
  // So why should we download the code up front?
  // The technique of downloading only what you need is known as
  // 'code splitting' or 'lazy loading'.

  // To implement 'code splitting' or 'lazy loading',
  // we need 'create react app' and 'react route for',
  // because 'code splitting' depends heavily
  // on the 'webpack' configuration you are using.

  // So for this to work in this setup, we need a higher order component.

  componentDidMount = () => {
    console.log("this.props in Blog", this.props);
  };

  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/posts/"
                  exact
                  activeClassName="my-active"
                  activeStyle={{
                    color: "#fa923f",
                    textDecoration: "underline"
                  }}
                >
                  Posts
                </NavLink>
                <NavLink
                  to={{
                    pathname: "/new-post",
                    hash: "#submit",
                    search: "?quick-submit=true"
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/* */}
        <Switch>
          {this.state.auth ? (
            <Route path="/new-post" component={AsyncNewPost} />
          ) : null}
          <Route path="/posts/" component={Posts} />
          <Route render={() => <h1>Not found</h1>} />
          {/*<Redirect from="/" to="/posts" /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
