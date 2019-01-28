import React, { Component } from "react";
//import axios from "axios";

// Use Link so your page doesn't reload when you switch pages
// NavLink has some extra props which allows you to use some stylling
// with this you get a class='active' atribute
import { Route, NavLink } from "react-router-dom";

import "./Blog.css";
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";

// When checking whether a link is active or not,
// it treats '/' as a prefix,
// so we have to add 'exact' on the link, to tell react router
// that the full path should be '/'
// for '/' to be the active link.
// <NavLink to="/" exact>

class Blog extends Component {
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/" exact>
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
      </div>
    );
  }
}

export default Blog;
