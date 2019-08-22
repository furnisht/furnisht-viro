import { AppRegistry } from "react-native";
import App from "./App.js";
import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./js/store/index";

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}



AppRegistry.registerComponent("Root", () => Root);

// The below line is necessary for use with the TestBed App
AppRegistry.registerComponent("Root", () => Root);
