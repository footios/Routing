import React, { Component } from "react";

import { Route, NavLink, Switch, Redirect } from "react-router-dom";

import "./Blog.css";
import Posts from "./Posts/Posts";

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
