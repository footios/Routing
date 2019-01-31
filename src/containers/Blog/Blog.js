import React, { Component } from "react";

import { Route, NavLink, Switch, Redirect } from "react-router-dom";

import "./Blog.css";
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";

class Blog extends Component {
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
        {/*The redirect component as it is a component.
        It is simply used in your jsx code, there
        you can add it to your switch statement 
        and then you specify a 'from' property, so from which route you
        want to navigate to which. 
        
        If you use it outside of the switch statement, 
        'from' can't be specified. 
        Then you can just always redirect to switch /posts 
        and not respect the path you were navigating to (see next lecture).
        
        So 'Redirect' doesn't render content, 
        it simply just changes the URL so that we then reach
        another route for which we render content.
        
        If you save all of that and we now load the root URL again, 
        you'll see that URL changes to /posts because we are redirected.*/}
        <Switch>
          <Route path="/new-post" component={NewPost} />
          <Route path="/posts/" component={Posts} />
          <Redirect from="/" to="/posts" />
        </Switch>
      </div>
    );
  }
}

export default Blog;
