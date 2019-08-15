import React, { Component } from "react";
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";

import { ViroARSceneNavigator } from "react-viro";

var sharedProps = {
  apiKey: "8C55396A-5FCB-4D94-B114-2F823C35529C"
};

var InitialARScene = require("./js/HelloWorldSceneAR");

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: "hi",
      sharedProps: sharedProps
    };

    this._exitViro = this._exitViro.bind(this);
    this.homePageButtons = this.homePageButtons.bind(this);
  }

  render() {
    return this.homePageButtons();
  }

  _exitViro() {
    this.setState({
      navigatorType: UNSET
    });
  }

  homePageButtons = () => {
    // eslint-disable-next-line no-unused-expressions
    return (
      <View style={styles.outer}>
        <ViroARSceneNavigator
          style={styles.arView}
          {...this.state.sharedProps}
          initialScene={{ scene: InitialARScene }}
        />

        <View style={styles.itemBar}>
          <TouchableOpacity style={{ marginTop: 500 }}>
            <Text style={styles.titleText}>Button</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.itemBar}>
          <TouchableOpacity style={{ marginTop: 500, marginLeft: 140 }}>
            <Text style={styles.titleText}>Button2</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.itemBar}>
          <TouchableOpacity style={{ marginTop: 500, marginLeft: 280 }}>
            <Text style={styles.titleText}>Button3</Text>
          </TouchableOpacity>
        </View>
        {/* // eslint-disable-next-line react/jsx-closing-tag-location */}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  arView: {
    flex: 2
  },
  viroContainer: {
    flex: 1,
    backgroundColor: "black"
  },
  outer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black"
  },
  inner: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "black"
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: "#fff",
    textAlign: "center",
    fontSize: 25
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  },
  navBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 77
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black"
  },
  itemBar: {
    flex: 1,
    alignSelf: "flex-end",
    position: "absolute",
    top: 100,
    paddingBottom: 85,
    padding: 20
  }
});

module.exports = ViroSample;
