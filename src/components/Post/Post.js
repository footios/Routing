import React from "react";
import { withRouter } from "react-router-dom";

import "./Post.css";

const post = props => {
  // Use withRouter (hoc) to get the props of the Router
  // to make the component Route aware
  // Now they have: history, location and match props
  console.log(props);
  return (
    <article className="Post" onClick={props.clicked}>
      <h1>{props.title}</h1>
      <div className="Info">
        <div className="Author">{props.author}</div>
      </div>
    </article>
  );
};

export default withRouter(post);
