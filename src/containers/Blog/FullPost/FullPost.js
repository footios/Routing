import React, { Component } from "react";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null
  };

  // In the props of Router in 'match, parms' we have the 'id'.
  // So now we check for 'this.props.match.params.id'

  componentDidMount() {
    console.log("this..", this.props.id);
    this.loadData();
  }

  // Note: when we are on a given post and we click on a different post,
  // we don't load that though you can see in the URL that the ID changes.
  // Now the reason for this is that react router behind the scenes
  // doesn't replace the component all the time.
  // We actually try to load a component that we're already on,
  // so componentDidMount is not executed again.
  // That's why we must implement componentDidUpdate.

  componentDidUpdate(prevProps, prevState) {
    this.loadData();
  }

  //This is just a convinience method
  loadData() {
    if (this.props.match.params.id) {
      // The problem here is that the 'id' we get from the 'Route param'
      // is a 'string' and we check also for type...
      // You either check like this '!='
      // or convert the id to a number by adding '+' infront.
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost &&
          this.state.loadedPost.id !== +this.props.match.params.id)
      ) {
        axios.get("/posts/" + this.props.match.params.id).then(response => {
          //console.log(response);
          this.setState({ loadedPost: response.data });
        });
      }
    }
  }
  // Conclusion:
  // It is important to understand that you need to handle changes in componentDidUpdate,
  // if the post component or if a component in general
  // is already loaded through routing because the
  // router will not unmount the old one and mount the same one again with different data.
  // It will reuse the old one and just adjust the route parameter.
  // It's your job to react to this new parameter and you can react to that
  // in componentDidUpdate which will be called because the props changed.

  deletePostHandler = () => {
    axios.delete("/posts/" + this.props.match.params.id).then(response => {
      console.log("response in deletePostHandler", response);
    });
  };

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;

    if (this.props.match.params.id) {
      post = <p style={{ textAlign: "center" }}>Loading...</p>;
    }
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete" onClick={this.deletePostHandler}>
              Delete
            </button>
          </div>
        </div>
      );
    }

    return post;
  }
}

export default FullPost;
