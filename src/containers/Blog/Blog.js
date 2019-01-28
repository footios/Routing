import React, { Component } from "react";
//import axios from "axios";

// Use Link so your page doesn't reload when you switch pages
// NavLink has some extra props which allows you to use some stylling
// with this you get a class='active' atribute
import { Route, NavLink } from "react-router-dom";

import "./Blog.css";
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";
import FullPost from "./FullPost/FullPost";

// In order to load FullPost here, we're going to use the 'id' of each post,
// as a dynamic routing parameter.
// So now when defining the Route, we need to inform react router
// about the fact that we now have a dynamic
// element in this URL.
//  <Route path="/:id" exact component={FullPost} />
// Note: After the colomn you may set any name, like postID etc.
// This (:id) will be replaced dynamically
// !!! Make sure you put <Route path="/new-post" component={NewPost} />
// before, otherwise /new-post could be interpreted as an id.
// So this 'id' is a Route parameter.

// In order to handle a click on a single post
// one way is to simply wrap that Post component we output here with a Link.
// In this way inplace of just a Post, you return a Link, which has a to attribute,
// where you can assing the dynamic id.
// Check Posts component...
// Now when we click on a post, we see the 'id' in the URL
// and we load the component (just that though, yet).

class Blog extends Component {
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/"
                  exact
                  activeClassName="my-active"
                  activeStyle={{
                    color: "#fa923f",
                    textDecoration: "underline"
                  }}
                >
                  Home
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
        {/* <Route path="/" exact render={() => <h1>Home</h1>} />
        <Route path="/" render={() => <h1>Home 2</h1>} /> */}
        <Route path="/" exact component={Posts} />
        <Route path="/new-post" component={NewPost} />
        <Route path="/:id" exact component={FullPost} />
      </div>
    );
  }
}

export default Blog;
