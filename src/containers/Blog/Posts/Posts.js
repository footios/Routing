import React, { Component } from "react";
import axios from "../../../axios";

import Post from "../../../components/Post/Post";
import "./Posts.css";

class Posts extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
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
    this.setState({ selectedPostId: id });
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

    return (
      /* Now I want to use routing in here.
    'section posts' should be a custom component 
    which we load when we visit /nothing on the URL. */

      <div>
        <section className="Posts">{posts}</section>
      </div>
    );
  }
}

export default Posts;
