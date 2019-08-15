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
import { Overlay } from "react-native-elements";

import { ViroARSceneNavigator } from "react-viro";

var sharedProps = {
  apiKey: "8C55396A-5FCB-4D94-B114-2F823C35529C"
};

var InitialARScene = require("./js/HelloWorldSceneAR");

var UNSET = "UNSET";

var AR_NAVIGATOR_TYPE = "AR";

var defaultNavigatorType = UNSET;

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: "hi",
      sharedProps: sharedProps
    };
    // this._getARNavigator = this._getARNavigator.bind(this);

    this._exitViro = this._exitViro.bind(this);
  }

  render() {
    return (
      <View style={localStyles.outer}>
        <ViroARSceneNavigator
          style={localStyles.arView}
          {...this.state.sharedProps}
          initialScene={{ scene: InitialARScene }}
        />

        <View style={localStyles.itemBar}>
          <TouchableOpacity style={localStyles.buttons}>
            <Text>hi</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // _getARNavigator() {
  //   return (
  //     <View styles={localStyles.outer}>
  //       <ViroARSceneNavigator
  //         {...this.state.sharedProps}
  //         initialScene={{ scene: InitialARScene }}
  //       />
  //     </View>
  //   );
  // }

  _exitViro() {
    this.setState({
      navigatorType: UNSET
    });
  }
}

var localStyles = StyleSheet.create({
  arView: {
    flex: 1
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
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
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
