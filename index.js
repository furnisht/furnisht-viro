import { AppRegistry } from "react-native";
import Main from "./App.js";
import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./js/store";

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

AppRegistry.registerComponent("Main", () => App);

// The below line is necessary for use with the TestBed App
AppRegistry.registerComponent("Main", () => App);
