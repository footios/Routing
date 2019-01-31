import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import "./NewPost.css";

class NewPost extends Component {
  state = {
    title: "",
    content: "",
    author: "Max",
    submitted: false
  };

  componentDidMount = () => {
    console.log("this.props in NewPost", this.props);
  };

  postDataHandler = () => {
    const data = {
      title: this.state.title,
      content: this.state.content,
      author: this.state.author
    };
    // second arg: data we sent
    // you can pass also a 3d arg to configure that request
    axios.post("/posts", data).then(response => {
      console.log(response);
      this.setState({ submitted: true });
    });
  };
  // Here in NewPost we probably want to redirect
  // once we click the submit button and once we make our HTTP request.

  // Now if we place 'Redirect' in jsx here outside of a switch statement,
  // we always have to redirect with the 'to' property though, we can't use 'from'.
  // Here we also use a condition...
  // So we render a component to leave the page!

  render() {
    let redirect = null;
    if (this.state.submitted) {
      redirect = <Redirect to="/posts" />;
    }
    return (
      <div className="NewPost">
        {redirect}
        <h1>Add a Post</h1>
        <label>Title</label>
        <input
          type="text"
          value={this.state.title}
          onChange={event => this.setState({ title: event.target.value })}
        />
        <label>Content</label>
        <textarea
          rows="4"
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
        <label>Author</label>
        <select
          value={this.state.author}
          onChange={event => this.setState({ author: event.target.value })}
        >
          <option value="Max">Max</option>
          <option value="Manu">Manu</option>
        </select>
        <button onClick={this.postDataHandler}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;
