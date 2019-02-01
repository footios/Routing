import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import Blog from "./containers/Blog/Blog";

// 1.
// If you are hosting your app on let's say 'example.com/'
// and if that's the page with which we're landing
// on the root page of your react-app,
// you don't need to set up anything special.
// But if you're serving your app from let's say 'example.com/myapp',
// then anything beneath that folder, should be your react-app.
// So, you need to tell React Router about this!
// You need to set the 'base path' for the React Router.
// So in our case in the App.js file, you can configure that,
// and you really need to do that!

// But there is a 'basename' prop you can set.
// By default, that's set to '/'.
// So this is the default which you don't need to set.
// <BrowserRouter basename='/'>
// But, if your serving your app from myapp,
// you should set this to
// <BrowserRouter basename='/my-aap'>,
// then all your requests
// are routed against '/myapp' and then the link you were pointing to.

// Otherwise... (check Posts)
class App extends Component {
  render() {
    return (
      // <BrowserRouter basename="/my-aap">
      <BrowserRouter>
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
