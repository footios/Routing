import React, { Component } from "react";
import axios from "../../../axios";
import { Route } from "react-router-dom";

import Post from "../../../components/Post/Post";
import FullPost from "../FullPost/FullPost";
import "./Posts.css";

class Posts extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("/posts")
      .then(response => {
        const posts = response.data.slice(0, 4);
        const udatedPosts = posts.map(post => {
          return {
            ...post,
            author: "Max"
          };
        });
        this.setState({ posts: udatedPosts });
      })
      // udate the state incase smth went wrong
      .catch(error => {
        console.log(error);
        // this.setState({ error: true });
      });
  }

  postSelectedHandler(id) {
    this.props.history.push({ pathname: "/" + id });
    // alternative:
    // this.props.history.push("/" + id );
  }

  render() {
    let posts = (
      <p style={{ textAlign: "center", color: "red" }}>Something went wrong!</p>
    );

    if (!this.state.error) {
      posts = this.state.posts.map(post => (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
        />
      ));
    }
    // You can use the route component
    // where ever you want in your application
    // as long as the page the component
    // where you are using it is wrapped by that browser router and that
    // of course is the case because we're wrapping
    // the blog component with it.
    // and since the post component is just a child component
    // of the blog component loaded through a route,
    // this works.

    // The problem is that we can not reach the FullPost route
    // because we have the 'exact' matching for just slash
    // in the parent Route that renders the Posts component (see Blog.js).
    // So "/:id" doesn't match that route and the Posts comp never gets rendered.
    // So we need to remove 'exact' from the parent Route in Blog.js
    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route path="/:id" exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;
