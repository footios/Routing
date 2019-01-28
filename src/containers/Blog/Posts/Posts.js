import React, { Component } from "react";
import axios from "../../../axios";
// import { Link } from "react-router-dom";

import Post from "../../../components/Post/Post";
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
  // I want to navigate programmatically.
  // Sometimes you have use cases where you want to navigate
  // after something finished, after a HTTP request was sent.
  // Here in the props we got 'history' and there
  // we actually have some functions we can execute.
  // Functions for navigating around like go back or go forward,
  // which do exactly what they sound like. They basically
  // do the same you have with the forward and backward buttons.
  // There also is this 'push' method which allows you to push
  // a new page onto the stack of pages because navigation
  // basically just is about a stack of pages.
  // Here is it: 'push: ƒ push(path, state)'

  postSelectedHandler(id) {
    this.props.history.push({ pathname: "/" + id });
    // alternative:
    // this.props.history.push("/" + id );
  }

  render() {
    let posts = (
      <p style={{ textAlign: "center", color: "red" }}>Something went wrong!</p>
    );

    //Here we use 'Link'...
    // But lets see an alternative
    if (!this.state.error) {
      posts = this.state.posts.map(post => (
        // <Link to={"/" + post.id} >
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
        />
        // </Link>
      ));
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
      </div>
    );
  }
}

export default Posts;
