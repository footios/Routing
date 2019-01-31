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
    // An alternative to render conditionaly NewPost in Blog.js
    // would be to redirect the user back if not authenticated.
    // e.g. If unauth => this.props.history.replace('/posts')

    // !!!!!!!!!!!!!!!!!
    // This is how you work with the react router,
    // this is how I want you to think about it.
    // You control a lot of it, by the way you render its components.
    // And if that route isn't rendered, you can't reach that route.
    // The definition isn't rendered so the component connected to it can't be loaded.
    // This is how you have to think about it
    // and how you have to structure your application.
    // Wrap your head around this this is really crucial
    // to get right and crucial to understand.
    // !!!!!!!!!!!!!!

    console.log("this.props in NewPost", this.props);
  };

  postDataHandler = () => {
    const data = {
      title: this.state.title,
      content: this.state.content,
      author: this.state.author
    };

    axios.post("/posts", data).then(response => {
      console.log(response);
      this.props.history.push("/posts");
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
