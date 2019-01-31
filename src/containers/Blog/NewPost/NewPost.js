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
    // Switch the page not with 'Redirect' but using the 'history' props.
    // and that history prop has a couple of convenience methods
    // we can use for replacing the current route
    // or pushing a new route.
    // We can access 'this.props.history' and there the 'push' method
    // which allows us to push a new page.

    // Technically, 'push' pushes this page onto the stack,
    // so if we click the back button, we go back to the new post page.
    // Whereas redirect replaces current page, so go back doesn' work as expected.
    // If you clicked several times you eventualy go back to posts,
    // but never to NewPost.

    // If you don't want to use the approach of rendering that component with Redirect,
    // 'replace' or 'push' also is a way,
    // of changing the page after some operation finished.
    // Note: 'replace' has the same behavior as 'Redirect'!

    axios.post("/posts", data).then(response => {
      console.log(response);
      this.props.history.replace("/posts");
      // this.setState({ submitted: true });
    });
  };

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
