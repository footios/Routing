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
    console.log("this.props in Posts:", this.props);
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

  // 2.
  // Otherwise, if you had a link like here,
  // this.props.history.push({ pathname: "/posts/" + id });
  // if you 'push' the page-change by clicking a post,
  // you will navigate to '/posts'.So 'push' will always
  // add this to your root domain.
  // Now if your react-app is served from '/myapp',
  // it will only work correctly and add it to the
  // end of your domain '/myapp', if 'basename' is set up.
  // So whenever you are serving your app from a sub directory,
  // make sure to set 'basename'!

  postSelectedHandler(id) {
    this.props.history.push({ pathname: "/posts/" + id });
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

    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route
          path={this.props.match.url + "/:id"}
          exact
          component={FullPost}
        />
      </div>
    );
  }
}

export default Posts;
