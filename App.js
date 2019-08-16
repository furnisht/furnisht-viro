import React, { Component } from "react";
import {
  AppRegistry,
  Text,
  View,
  Modal,
  PixelRatio,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import styles from "./styles";
import { Instructions } from "./js/components/Instructions";

import { ViroARSceneNavigator } from "react-viro";

var sharedProps = {
  apiKey: "8C55396A-5FCB-4D94-B114-2F823C35529C"
};

var InitialARScene = require("./js/HelloWorldSceneAR");

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: "",
      sharedProps: sharedProps
    };

    this._exitViro = this._exitViro.bind(this);
    this.homePage = this.homePage.bind(this);
  }

  render() {
    return this.homePage();
  }

  _exitViro() {
    this.setState({
      navigatorType: UNSET
    });
  }

  homePage = () => {
    // eslint-disable-next-line no-unused-expressions
    return (
      <View style={styles.outer}>
        <ViroARSceneNavigator
          style={styles.arView}
          {...this.state.sharedProps}
          initialScene={{ scene: InitialARScene }}
        />
        <Instructions />
        <View style={styles.navBar}>
          <TouchableOpacity>
            <Text style={styles.titleText}>Floor Plan</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.titleText}>Furnish</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.titleText}>Project</Text>
          </TouchableOpacity>
        </View>
        {/* // eslint-disable-next-line react/jsx-closing-tag-location */}
      </View>
    );
  };
}

module.exports = ViroSample;
