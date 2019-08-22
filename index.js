import { AppRegistry } from "react-native";
import Main from "./app";
import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./js/store/index";

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}



AppRegistry.registerComponent("Main", () => Root);

// The below line is necessary for use with the TestBed App
AppRegistry.registerComponent("Main", () => Root);
