import React, { Component } from "react";

import { Route, NavLink, Switch, Redirect } from "react-router-dom";

import "./Blog.css";
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";

class Blog extends Component {
  state = {
    auth: false
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
        {/* You can specify the route component here and if you leave out the 'path' 
        so you don't add 'path', you can simply define a component
        or the render method, to render something for any unknown route.
        So here I'm going to output 'not found'.
        Of course you could use α component and render a 404 error page component.
        But this route will catch any routes which are not handled prior to it.*/}
        <Switch>
          {this.state.auth ? (
            <Route path="/new-post" component={NewPost} />
          ) : null}
          <Route path="/posts/" component={Posts} />
          <Route render={() => <h1>Not found</h1>} />
          {/* 
          Now as I said, it won't work together with 'Redirect', 
          if you redirect from '/'. If you redirect from any
          error page than slash, it'll work though.
          Because 'from' is treated as a prefix and therefore it catches
          all routes as does the 'Not found' 'Route' and therefore 
          no matter how you order them, it won't work together.
          
          <Redirect from="/" to="/posts" /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
