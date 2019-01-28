import React, { Component } from "react";
import axios from "../../../axios";
import { Link } from "react-router-dom";

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

  postSelectedHandler(id) {
    this.setState({ selectedPostId: id });
  }

  render() {
    let posts = (
      <p style={{ textAlign: "center", color: "red" }}>Something went wrong!</p>
    );
    if (!this.state.error) {
      posts = this.state.posts.map(post => (
        <Link to={"/" + post.id} key={post.id}>
          <Post
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        </Link>
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
